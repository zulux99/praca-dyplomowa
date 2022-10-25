import React from 'react';
// import Doughnut from 'react-chartjs-2';
import GetBills from './GetBills';
import { useState } from 'react';
import { useEffect } from 'react';

function DoughnutChart() {
  const [bills, setBills] = useState([]);
  setBills(GetBills());
  useEffect(() => {
    console.log(bills);
  }, [bills]);
  return (
    <>
      {/* <Doughnut
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'bottom'
            },
            title: {
              display: true,
              text: 'Rachunki'
            }
          }
        }}
        data={{
          labels: bills.map((bill) => bill.nazwa),
          datasets: [
            {
              label: 'Rachunki',
              data: bills.map((bill) => bill.kwota),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }
          ]
        }}
      /> */}
    </>
  );
}

export default DoughnutChart;
