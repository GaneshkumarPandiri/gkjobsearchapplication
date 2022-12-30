import './index.css'

const EmploymentTypes = props => {
  const {employmentType, onEmploymentType} = props
  const {label, employmentTypeId} = employmentType

  const onClickCheckbox = event => {
    onEmploymentType(event.target.value)
  }

  return (
    <li className="employment-type">
      <input
        type="checkbox"
        id={label}
        onChange={onClickCheckbox}
        value={employmentTypeId}
      />
      <label htmlFor={label} className="label">
        {label}
      </label>
    </li>
  )
}

export default EmploymentTypes
