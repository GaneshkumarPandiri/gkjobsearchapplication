import './index.css'

const SalaryRanges = props => {
  const {salaryRange, onSalaryRange} = props
  const {salaryRangeId, label} = salaryRange
  const onClickRadio = () => {
    onSalaryRange(salaryRangeId)
  }
  return (
    <li className="salary-range">
      <input
        type="radio"
        id={label}
        name="salary"
        onChange={onClickRadio}
        value={label}
      />
      <label htmlFor={label} className="label">
        {label}
      </label>
    </li>
  )
}

export default SalaryRanges
