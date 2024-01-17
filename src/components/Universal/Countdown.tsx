import { Dispatch, SetStateAction } from "react";
import Countdown, { zeroPad } from "react-countdown";
import { convertStringDateToMilleseconds } from "~/utils/libs";

//@ts-ignore
let renderer = ({ days, hours, minutes, seconds, completed }) => {
  const Completionist = () => <span className="text-green-500">NIL</span>;
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    if (days > 0) {
      return (
        <span suppressHydrationWarning={true}>
        {days}d {zeroPad(hours)}h {zeroPad(minutes)}m
      </span>
    );
    }

    return (
      <span suppressHydrationWarning={true}>
        {zeroPad(hours)}h {zeroPad(minutes)}m <span className="text-red-400">
        {zeroPad(seconds)}s
        </span>
      </span>
    );

  }
};






export default function CountDownComponent({
  date,
  setStarted,
  setEnded,
  type
}: {
    date: string | null;
  type: "start" | "end"
  setStarted: Dispatch<SetStateAction<boolean>>;
  setEnded: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Countdown
      date={convertStringDateToMilleseconds(date)}
      renderer={renderer}
      onComplete={() => {
        if(type === "start")
          setStarted(true);
        if (type === "end")
          setEnded(true)
      }}
    />
  );
}
