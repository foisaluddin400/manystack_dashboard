import { EarningGrowth } from "./EarningGrowth";
import { SubscriptionGrowth } from "./SubscriptionGrowth";
import UserGrowth from "./UserGrowth";



const Dashboard = () => {
  return (
    <div className="p-2 min-h-screen">
      <div className="  grid grid-cols-3 gap-4 text-center py-3">
        <div className="bg-white py-6 rounded-md">
          <p className=" mt-3 text-xl">Total Earning</p>
          <h1 className="text-3xl font-bold text-[#34C759]">$7.23</h1>
        </div>
        <div className=" bg-white py-6 rounded-md">
          <p className=" mt-3 text-xl">Total Technician</p>
          <h1 className="text-3xl font-bold text-[#34C759]">70+</h1>

        </div>
        <div className=" bg-white py-6 rounded-md">
          <p className=" mt-3 text-xl">Blocked account</p>
          <h1 className="text-3xl font-bold text-[#34C759]">10</h1>

        </div>

      </div>
      <div className="lg:grid grid-cols-2 gap-4">
        <div className="bg-white rounded p-3">
          <UserGrowth></UserGrowth>
        </div>
        <div className="bg-white rounded mt-3 lg:mt-0">
          <SubscriptionGrowth></SubscriptionGrowth>

        </div>
      </div>
      <EarningGrowth></EarningGrowth>
    </div>
  );
};

export default Dashboard;
