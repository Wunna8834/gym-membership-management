import { getCustomerInfo } from "@/actions/customer.actions";
import AddBodyMeasurements from "@/components/buttons/AddBodyMeasurements";
import BodyMeasurementsForm from "@/components/members/BodyMeasurementsForm";
import BodyRecord from "@/components/members/BodyRecord";
import CustomerFormSections from "@/components/members/CustomerFormSections";
import GeneralInfo from "@/components/members/GeneralInfo";
import MonthlyBodyMeasurement from "@/components/members/MonthlyBodyMeasurement";

export interface UserInfo {
  _id: string;
  name: string;
  gender: string;
  phoneNumber: string;
  paymentType: string;
  expireDate: Date;
  bodyMeasurements: [
    {
      _id: string;
      month: string;
      weight: number;
      neck: number;
      chest: number;
      waist: number;
      arms: {
        left: number;
        right: number;
      };
      thight: {
        left: number;
        right: number;
      };
      calf: {
        left: number;
        right: number;
      };
    }
  ];
}
const page = async ({ params }: { params: { customerID: string } }) => {
  const customerInfo: UserInfo = await getCustomerInfo(params.customerID);
  return (
    <div className="space-y-3">
      <GeneralInfo
        customerName={customerInfo.name}
        gender={customerInfo.gender}
        phone={customerInfo.phoneNumber}
        expireDate={customerInfo.expireDate}
      />
      <CustomerFormSections customerID={params.customerID} />
      <section className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
        {customerInfo.bodyMeasurements.length > 0 &&
          customerInfo.bodyMeasurements.map((info) => (
            <BodyRecord
              key={info._id}
              month={info.month}
              weight={info.weight}
              chest={info.chest}
              neck={info.neck}
              waist={info.waist}
              arms={info.arms}
              thight={info.thight}
              calf={info.thight}
            />
          ))}
      </section>
    </div>
  );
};

export default page;
