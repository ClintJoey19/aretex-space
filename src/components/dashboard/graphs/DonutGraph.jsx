import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(Tooltip, Legend, ArcElement);

const DonutGraph = ({ storageQuota }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        footerSpacing: 5,
      },
    },
  };

  const data = {
    labels: ["Capacity", "Usage", "My Drive", "Trashed"],
    datasets: [
      {
        data: storageQuota,
        backgroundColor: ["#36a2eb", "#ff6384", "#fdce4a", "#7956ff"],
        hoverOffset: 8,
      },
    ],
  };
  return (
    <>
      <Doughnut options={options} data={data} />
    </>
  );
};

export default DonutGraph;
