export const sidebarData = [
  {
    heading: "My Account",
    links: [
      {
        name: "Addresses",
        link: "/profile/address",
      },
      {
        name: "Account Security",
        link: "/profile/security",
      },
    ],
  },
  {
    heading: "My Orders",
    links: [
      {
        name: "All Orders",
        link: "/profile/orders",
        filter: "",
      },
      {
        name: "Paid Orders",
        link: "/profile/orders",
        filter: "paid",
      },
      {
        name: "Unpaid Orders",
        link: "/profile/orders",
        filter: "unpaid",
      },

      {
        name: "Processing Orders",
        link: "/profile/orders",
        filter: "Processing",
      },

      {
        name: "Dispatched Orders",
        link: "/profile/orders",
        filter: "Dispatched",
      },
      {
        name: "Delievered Orders",
        link: "/profile/orders",
        filter: "Completed",
      },
      {
        name: "Cancelled Orders",
        link: "/profile/orders",
        filter: "Cancelled",
      },
    ],
  },
  // {
  //   heading: "My Lists",
  //   links: [
  //     {
  //       name: "Whishlist",
  //       link: "/profile/wishlist",
  //     },
  //     {
  //       name: "Recently Viewed",
  //       link: "/profile/recent",
  //     },
  //   ],
  // },
  // {
  //   heading: "Customer Service",
  //   links: [
  //     {
  //       name: "My Message",
  //       link: "/profile/messages",
  //     },
  //     {
  //       name: "Service Records",
  //       link: "/profile/services",
  //     },
  //   ],
  // },
  // {
  //   heading: "Other Services",
  //   links: [
  //     {
  //       name: "Survey Center",
  //       link: "",
  //     },
  //     {
  //       name: "Contact Preferences",
  //       link: "",
  //     },
  //   ],
  // },
  {
    heading: "Policy",
    links: [
      {
        name: "Shipping Info",
        link: "",
      },
      {
        name: "Return Policy",
        link: "",
      },
      {
        name: "Privacy & Cookie Policy",
        link: "",
      },
    ],
  },
  {
    heading: "Sign out",
    link: [],
  },
];

export const ordersLinks = [
  {
    name: "All Orders",
    filter: "",
  },
  {
    name: "Paid Orders",
    filter: "paid",
  },
  {
    name: "Unpaid Orders",
    filter: "unpaid",
  },
  {
    name: "Dispatched Orders",
    filter: "Dispatched",
  },
  {
    name: "Delivered Orders",
    filter: "Delievered",
  },
  {
    name: "Cancelled Orders",
    filter: "Cancelled",
  },
];

export const storeData = [
  {
    heading: "Seller Account",
    links: [
      {
        name: "Dashboard",
        link: "/storeAdmin/dashboard",
      },
    ],
  },
  {
    heading: "Orders",
    links: [
      {
        name: "All Orders",
        link: "/storeAdmin/orders",
      },
    ],
  },
  {
    heading: "Products",
    links: [
      {
        name: "All Products",
        link: "/storeAdmin/dashboard/product/all",
      },
      {
        name: "Create Product",
        link: "/storeAdmin/create",
      },
    ],
  },
  {
    heading: "Sign out",
    link: [],
  },
];
