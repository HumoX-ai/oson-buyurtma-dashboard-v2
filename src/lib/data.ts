import axios from "axios";
export interface Restaurant {
  uuid: string;
  id: number;
  name: string;
  image: string;
  description: string;
  address: string;
  contact_phone: string;
  contact_email: string;
  status: ["active", "archived"];
  owner: number;
}

type Menu = {
  id: number;
  name: string;
  items: MenuItem[];
};

type MenuItem = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  stock: number;
  status: "active" | "archived";
};

export interface UserInfo {
  id: number;
  phone: string;
  name: string;
  role: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Restaurant[];
}

export async function getRestaurants(): Promise<Restaurant[]> {
  try {
    const res = await axios.get<ApiResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/restaurants/`
    );

    return res.data.results;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
}

export async function getRestaurantMenu(id: number): Promise<Menu[] | null> {
  try {
    const res = await axios.get<Menu[]>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/restaurants/${id}/menus/`
    );

    return res.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export async function getUserInfo(token: string): Promise<UserInfo | null> {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_AUTH}/auth/profile/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export async function getRestaurantOwner(): Promise<UserInfo[] | undefined> {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_AUTH}/auth/users/`);
    const filteredUsers = res.data.results.filter(
      (user: UserInfo) => user.role === "restaurant_owner"
    );
    return filteredUsers;
  } catch (error) {
    console.log("error", error);
  }
}
