import { useGetMetaDataQuery } from "../../page/redux/api/categoryApi";
import { EarningGrowth } from "./EarningGrowth";
import { SubscriptionGrowth } from "./SubscriptionGrowth";
import UserGrowth from "./UserGrowth";



const Dashboard = () => {
  const {data:metadata} = useGetMetaDataQuery()
  return (
    <div className="p-2 min-h-screen">
      <div className="  grid grid-cols-2 gap-4 text-center py-3">
       
        <div className=" bg-white py-6 rounded-md">
          <p className=" mt-3 text-xl">Total Technician</p>
          <h1 className="text-3xl font-bold text-[#34C759]">{metadata?.data?.totalTechnicians || 0}</h1>

        </div>
        <div className=" bg-white py-6 rounded-md">
          <p className=" mt-3 text-xl">Blocked account</p>
          <h1 className="text-3xl font-bold text-[#34C759]">{metadata?.data?.blockedAccounts || 0}</h1>

        </div>

      </div>
      <div className="">
        <div className="bg-white rounded p-3">
          <UserGrowth></UserGrowth>
        </div>
       
      </div>
     
    </div>
  );
};

export default Dashboard;
