import { Button } from "@base-ui/react";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" flex flex-row p-10 m-10 justify-center justify-items-center-safe">
      <button className="bg-purple-700">Click me</button>
      <Button variant="secondary" className={"bg-amber-700"}>Base UI Button</Button>

    </div>
  );
  
}
