import * as React from "react";

import { cn } from "@/lib/utils";
import { PostElement } from "@/types";
import { AiOutlineDislike, AiOutlineEye, AiOutlineLike } from "react-icons/ai";
import { Badge } from "./badge";
import { PostMetaDataTooltip } from "./tooltip";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

const PostCard = ({ title, body, tags, reactions, views }: PostElement) => {
  return (
    <Card className="flex flex-col justify-between hover:shadow-md">
      <CardHeader>
        <CardTitle className="cursor-pointer">{title}</CardTitle>
        <CardDescription>
          <ul className="flex flex-wrap gap-1.5" aria-label="post tags">
            {tags.map((tag, index) => (
              <li key={index} className="mt-2">
                <Badge>{tag}</Badge>
              </li>
            ))}
          </ul>
        </CardDescription>
      </CardHeader>
      <div>
        <CardContent>
          <p className="w-[calc(100% + 6px)] scroll-bar h-40 overflow-y-auto py-1 pr-3">
            {body}
          </p>
        </CardContent>
        <CardFooter className="flex items-end justify-between">
          <PostMetaDataTooltip
            icon={<AiOutlineEye size={22} />}
            text={views}
            tooltipText="Number of views for the post"
          />

          <div className="flex space-x-4">
            <PostMetaDataTooltip
              icon={<AiOutlineLike size={22} />}
              text={reactions.likes}
              tooltipText="Post likes"
            />
            <PostMetaDataTooltip
              icon={<AiOutlineDislike size={22} />}
              text={reactions.dislikes}
              tooltipText="Post dislikes"
            />
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  PostCard,
};
