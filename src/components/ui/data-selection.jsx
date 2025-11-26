import React, { useEffect, useState } from 'react'
import { addMonths, format, isValid } from 'date-fns'

import { DatePickerWithRange } from '@/components/ui/date-picker-with-ranger'
import { useNavigate, useSearchParams } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthContext } from '@/context/auth'

const formatDateToQueryParam = (date) => format(date, 'yyyy-MM-dd')

const getInitialDateState = (searchParams) => {
  const defaultDate = {
    from: new Date(),
    to: addMonths(new Date(), 1),
  }

  const from = searchParams.get('from')
  const to = searchParams.get('to')

  if (!from || !to) {
    return defaultDate
  }

  // Neste ponto, eu tenho o "from" E o "to"
  // Eles são válidos?
  const datesAreInvalid = !isValid(new Date(from)) || !isValid(new Date(to))
  // Se não forem válidos, eu retorno o default
  if (datesAreInvalid) {
    return defaultDate
  }
  // Neste ponto, ambas as datas são validas
  return {
    from: new Date(from + 'T00:00:00'),
    to: new Date(to + 'T00:00:00'),
  }
}

const DateSelection = () => {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuthContext()

  const [date, setDate] = useState(getInitialDateState(searchParams))

  // 1ª - SEMPRE QUE O STATE "date" MUDAR, EU PRECISO PERSISTI-LO NA URL (?from&to=)
  useEffect(() => {
    if (!date?.from || !date?.to) return
    const queryParams = new URLSearchParams()
    queryParams.set('from', formatDateToQueryParam(date.from))
    queryParams.set('to', formatDateToQueryParam(date.to))
    navigate(`/?${queryParams.toString()}`)
    queryClient.invalidateQueries([
      {
        queryKey: [
          'balance',
          user.id,
          formatDateToQueryParam(date.from),
          formatDateToQueryParam(date.to),
        ],
      },
    ])
  }, [navigate, date, queryClient, user.id])

  // 2ª - QUANDO  EU RECARREGAR A PAGINA, EU PEGO O FROM E O TO DA URL E PERSISTO NO STATE

  return (
    <div>
      <DatePickerWithRange value={date} onChange={setDate} />
    </div>
  )
}

export default DateSelection
