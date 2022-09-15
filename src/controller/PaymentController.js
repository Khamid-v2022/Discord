// models
import Payments from "../model/Payment.js";
import Link from "../model/Link.js";

async function getPayments(req, res) {
  try {
    const response = await Payments.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userid",
          foreignField: "userid",
          as: "user_data",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$user_data", 0] }, "$$ROOT"],
          },
        },
      },
      { $project: { user_data: 0 } },
      {
        $project: { username: 1, trxid: 1, amount: 1, package: 1, trx_time: 1 },
      },
    ]);
    res.send(response);
  } catch (error) {
    console.log({ message: error.message });
    res.json({ message: error.message });
  }
}

async function getChart(req, res) {
  try {
    let lastweek = new Date().getDate() - 7; // deducting 7 days
    let lastWeekDate = new Date();
    lastWeekDate.setDate(lastweek);

    const response = await Link.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $gte: ["$expire_at", new Date(lastWeekDate).toISOString()] },
            ],
          },
        },
      },
      {
        $group: {
          _id: { $dayOfMonth: "$expire_at" },
          sales: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          sales: 1,
        },
      },
    ]);

    res.send(response);
  } catch (error) {
    console.log({ message: error.message });
    res.json({ message: error.message });
  }
}

const PaymentController = {
  getPayments,
  getChart,
};

export default PaymentController;
