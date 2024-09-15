import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Phone, Calendar, MapPin, Mail } from "lucide-react";
import Image from "next/image";
import { UserInfo, Restaurant } from "@/lib/data";

interface UsersCardProps {
  user: UserInfo;
  restaurant?: Restaurant[]; // Optional restaurant data if available
  onEdit: () => void;
  onDelete: () => void;
}

const AdministrationCard: React.FC<UsersCardProps> = ({
  user,
  restaurant = [],
  onEdit,
  onDelete,
}) => {
  return (
    <Card key={user.id} className="shadow-lg overflow-hidden ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{user.name}</CardTitle>
        <Badge variant={user.is_active ? "default" : "secondary"}>
          {user.is_active ? "Aktiv" : "Aktiv emas"}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="h-4 w-4" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>
              Qo&#39;shilgan: {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {restaurant.length > 0 ? (
          <div className="mt-4 pt-4 border-t">
            <h3 className="font-semibold mb-2">
              Restoranlar ma&#39;lumotlari:
            </h3>
            <div className="space-y-8">
              {restaurant.map((restaurant) => (
                <div key={restaurant.id} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-12 relative overflow-hidden rounded-full">
                      <Image
                        src={restaurant.image}
                        alt={restaurant.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                    <span className="font-medium">{restaurant.name}</span>
                  </div>
                  <div className="h-full flex flex-col gap-1 justify-between">
                    <div className="flex space-x-2 text-sm">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span className="break-words">{restaurant.address}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4" />
                      <span>{restaurant.contact_email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-4 pt-4 border-t">
            <h3 className="font-semibold mb-2">
              Restoranlar ma&#39;lumotlari:
            </h3>
            <p className="text-sm">Hech qanday restoran topilmadi</p>
          </div>
        )}

        <div className="flex justify-between mt-4">
          <Button
            variant="default"
            size="sm"
            className="flex items-center"
            onClick={onEdit}
          >
            <Edit className="h-4 w-4 mr-2" />
            Tahrirlash
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex items-center"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            O&#39;chirish
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdministrationCard;
