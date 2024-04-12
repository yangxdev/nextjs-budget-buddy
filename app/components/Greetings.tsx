import GlobalConfig from "@/app/app.config";
import { useSession } from "next-auth/react";

export default function Greetings() {
  function HandleUsername(greeting: string) {
    const { data: session } = useSession();
    const username = session?.user?.name;
    return greeting.replace("{username}", username || "user");
  }

  const document = typeof window === "undefined" ? null : window.document;
  const greeting = document?.querySelector(".greeting")?.textContent;
  if (greeting) {
    return greeting;
  }

  const gc = GlobalConfig.i18n;
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  let timeOfDay = "";
  if (currentHour >= 6 && currentHour < 12) {
    timeOfDay = "morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    timeOfDay = "afternoon";
  } else if (currentHour >= 18 && currentHour < 22) {
    timeOfDay = "evening";
  } else {
    timeOfDay = "night";
  }

  const defaultLanguage = gc.defaultLanguage || "en";
  // get a 25% chance of getting a basic greeting, 75% of getting a timed greeting
  // each greeting has 4 variations, pick a random one
  const random = Math.random();
  if (random < 0.25) {
    const greetings = GlobalConfig.i18n.greetings[defaultLanguage]?.basic;
    const randomIndex = Math.floor(Math.random() * greetings!.length);
    return HandleUsername(greetings![randomIndex]);
  } else {
    const greetings = (GlobalConfig.i18n.greetings[defaultLanguage]?.timed as { [key: string]: string[] })?.[timeOfDay];
    const randomIndex = Math.floor(Math.random() * greetings!.length);
    return HandleUsername(greetings![randomIndex]);
  }
}
