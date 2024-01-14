import Countdown, { zeroPad } from "react-countdown";


//@ts-ignore
let renderer = ({ days, hours, minutes, seconds, completed }) => {
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

//@ts-ignore
let renderer2 = ({ days, hours, minutes, seconds, completed }) => {
  const Completionist = () => <span className="text-green-500">NIL</span>;
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span suppressHydrationWarning={true}>
        {days}d {hours}h
      </span>
    );
  }
};




export default function CountDownComponent({
  start_date,
  fromInput
}: {
    start_date: number,
  fromInput? : boolean

  })


  {
  const myRenderer = fromInput ? renderer2 : renderer
  return (
    <Countdown
      date={start_date}
      renderer={myRenderer}
    />
  );
}
