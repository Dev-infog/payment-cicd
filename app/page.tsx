// "use client";

// export default function Home() {
//   const courses = [
//   {
//     id: "plan_basic",
//     name: "Basic Plan",
//     price: 499,
//     features: "Access to basic tutorials",
//   },
//   {
//     id: "plan_premium",
//     name: "premium Plan",
//     price: 999,
//     features: "Access to Full course access",
//   },
// ];

//   const handlePayment = async (price: number) => {
//     // 1. Create order
//     const res = await fetch("/api/create-order", {
//       method: "POST",
//       body: JSON.stringify({ amount: price }),
//     });

//     const order = await res.json();

//     // 2. Razorpay options
//     const options = {
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: "INR",
//       name: "Course Platform",
//       description: "Course Purchase",
//       order_id: order.id,
//       handler: async function (response: any) {
//         // 3. Verify payment
//         const verify = await fetch("/api/verify-payment", {
//           method: "POST",
//           body: JSON.stringify(response),
//         });
        
//         const result = await verify.json();

//         if (result.success) {
//           alert("Payment Successful ");
//         } else {
//           alert("Payment Failed ");
//         }
//       },
//       theme: { color: "#4f46e5" },
//     };
//     // console.log("KEY:", process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);


//     const rzp = new (window as any).Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center gap-6 bg-gray-100">
//       {courses.map((course, i) => (
//         <div
//           key={i}
//           className="bg-white p-6 rounded-2xl shadow-lg w-64 text-center"
//         >
//           <h2 className="text-xl font-bold">{course.name}</h2>
//           <p className="text-2xl my-4">₹{course.price}</p>
//           <p className="text-xl my-2">{course.features}</p>

//           <button
//             onClick={() => handlePayment(course.price)}
//             className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
//           >
//             Buy Now
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }
"use client";

type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

export default function Home() {
  const courses = [
    {
      id: "plan_basic",
      name: "Basic Plan",
      price: 499,
      features: "Access to basic tutorials",
    },
    {
      id: "plan_premium",
      name: "Premium Plan",
      price: 999,
      features: "Access to Full course access",
    },
  ];

  const handlePayment = async (price: number) => {
    // 1. Create order
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: price }),
    });

    const order = await res.json();

    // 2. Razorpay options
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Course Platform",
      description: "Course Purchase",
      order_id: order.id,

      handler: async function (response: RazorpayResponse) {
        // 3. Verify payment
        const verify = await fetch("/api/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(response),
        });

        const result = await verify.json();

        if (result.success) {
          alert("Payment Successful");
        } else {
          alert("Payment Failed");
        }
      },

      theme: { color: "#4f46e5" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen flex items-center justify-center gap-6 bg-gray-100">
      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-white p-6 rounded-2xl shadow-lg w-64 text-center"
        >
          <h2 className="text-xl font-bold">{course.name}</h2>
          <p className="text-2xl my-4">₹{course.price}</p>
          <p className="text-xl my-2">{course.features}</p>

          <button
            onClick={() => handlePayment(course.price)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Buy Now
          </button>
        </div>
      ))}
    </div>
  );
}