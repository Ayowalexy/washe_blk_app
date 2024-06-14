import { Basket } from "../utils/assets-png";

export const LaundryRequests = [
  {
    img: Basket,
    status: "completed",
    id: 1,
    text: "Your laundry request is currently pending",
    date: "25th Jun 2023, 04:45 PM",
    name: "Duvets & Bulky items (Feather comforter, Pillows & Bedspreads)",
  },
  {
    img: Basket,
    status: "completed",
    id: 2,
    text: "Your laundry request is now ready",
    date: "25th Jun 2023, 04:45 PM",
    name: "Dry Cleaning (Whites & Delicates)",
  },
  {
    img: Basket,
    status: "processing",
    id: 3,
    text: "Your laundry request is currently pending",
    date: "27th Jun 2023, 04:45 PM",
    name: "Dry Cleaning (Whites & Delicates)",
  },
  {
    img: Basket,
    status: "pending",
    id: 4,
    text: "Your laundry request is currently pending",
    date: "28th Jun 2023, 04:45 PM",
    name: "Duvets & Bulky items (Feather comforter, Pillows & Bedspreads)",
  },
];

const groupByDate = (requests: any) => {
  const groupedRequests: any = {};
  requests.forEach((request: any) => {
    const date = request.date.split(",")[0];
    if (!groupedRequests[date]) {
      groupedRequests[date] = [];
    }
    groupedRequests[date].push(request);
  });
  return groupedRequests;
};

// Group laundry requests by date
export const groupedLaundryRequests = groupByDate(LaundryRequests);
