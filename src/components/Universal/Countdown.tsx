import Countdown, { zeroPad } from "react-countdown";

type Renderer = {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};
//@ts-ignore
let renderer = ({ days, hours, minutes, seconds, completed }: Renderer) => {
  hours += days * 24;
  const Completionist = () => <span className="text-green-500">NIL</span>;
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span suppressHydrationWarning={true}>
        {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    );
  }
};

function convertStringDateToMilleseconds(date: string) {
  if(!date) return 0
  const dateObject = new Date(date);
  return dateObject.setHours(0, 0, 0, 0)};



export default function CountDownComponent({
  startDate, endDate
}: {
    startDate: string,
  endDate: string
  })

{

  // console.log("I am here")
  //     let dateCounted = 0
  // let start = convertStringDateToMilleseconds(startDate);
  //     let now = Date.now();
  // let end = convertStringDateToMilleseconds(endDate);

  //   if (start > now) {
  //     dateCounted = start;

  //     } else if (end > now) {
  //     dateCounted = end;
  // }
  // else { dateCounted = Date.now() }



  // console.log(`${dateCounted} was set`)
  return (
    <Countdown
      date={Date.now()  + 1000}
      renderer={renderer}
      daysInHours
    />
  );
}
