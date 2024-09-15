import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { MenuItemSkeleton } from "@/components/Loading";

export default function Loading() {
  return (
    <div className="container mx-auto p-4">
      <Skeleton className="h-10 w-64 mx-auto mb-6" />
      <Accordion type="single" collapsible className="w-full">
        {[1, 2, 3].map((index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>
              <Skeleton className="h-6 w-40" />
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <MenuItemSkeleton key={item} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
