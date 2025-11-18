import React, { useState } from 'react'
import { addMonths } from 'date-fns'

import { DatePickerWithRange } from '@/components/ui/date-picker-with-ranger'

const DateSelection = () => {
  const [date, setDate] = useState({
    from: new Date(),
    to: addMonths(new Date(), 1),
  })
  return (
    <div>
      <DatePickerWithRange value={date} onChange={setDate} />
    </div>
  )
}

export default DateSelection
