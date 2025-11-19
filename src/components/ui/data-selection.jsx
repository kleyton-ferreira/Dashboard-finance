import React, { useEffect, useState } from 'react'
import { addMonths, format } from 'date-fns'

import { DatePickerWithRange } from '@/components/ui/date-picker-with-ranger'
import { useNavigate, useSearchParams } from 'react-router'

const formatDateToQueryParam = (date) => format(date, 'yyyy-MM-dd')

const DateSelection = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [date, setDate] = useState({
    from: searchParams.get('from')
      ? new Date(searchParams.get('from') + 'T00:00:00')
      : new Date(),
    to: searchParams.get('to')
      ? new Date(searchParams.get('to') + 'T00:00:00')
      : addMonths(new Date(), 1),
  })

  // 1ª - SEMPRE QUE O STATE "date" MUDAR, EU PRECISO PERSISTI-LO NA URL (?from&to=)
  useEffect(() => {
    if (!date?.from || !date?.to) return
    const queryParams = new URLSearchParams()
    queryParams.set('from', formatDateToQueryParam(date.from))
    queryParams.set('to', formatDateToQueryParam(date.to))

    if (date.from && date.to) {
      navigate(`/?${queryParams.toString()}`)
    }
  }, [navigate, date])

  // 2ª - QUANDO  EU RECARREGAR A PAGINA, EU PEGO O FROM E O TO DA URL E PERSISTO NO STATE

  return (
    <div>
      <DatePickerWithRange value={date} onChange={setDate} />
    </div>
  )
}

export default DateSelection
