import Countdown, { zeroPad } from "react-countdown";

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
        {zeroPad(hours)}h {zeroPad(minutes)}m {zeroPad(seconds)}s
      </span>
    );

  }
};



function convertStringDateToMilleseconds(date: string | null) {
  if (!date) return Date.now();
  const dateObject = new Date(date);
  return dateObject.setHours(0, 0, 0, 0);
}


export default function CountDownComponent({
  start_date,
}: {
  start_date: string | null,

  })


  {

  return (
    <Countdown
      date={convertStringDateToMilleseconds(start_date)}
      renderer={renderer}
    />
  );
}
