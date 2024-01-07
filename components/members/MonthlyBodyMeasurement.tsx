import Customer from "@/model/customer"

const MonthlyBodyMeasurement = async ({customerID} : {customerID: string}) => {
  return (
    <div className="text-white">
      <h1>Monthly Body </h1>
      <p>{customerID}</p>
    </div>
  )
}

export default MonthlyBodyMeasurement