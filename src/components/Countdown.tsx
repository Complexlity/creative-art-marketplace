import Countdown, { zeroPad} from 'react-countdown'


type Renderer = {
  hours: number,
  minutes: number,
  seconds: number,
  completed: boolean
}
let renderer = ({ hours, minutes, seconds, completed }: Renderer) => {
  const Completionist = () => <span className="text-green-500">NIL</span>;
  if (completed) {
    // Render a completed state
  return <Completionist />;
} else {
  // Render a countdown
  return <span suppressHydrationWarning={true}>{hours ? `${zeroPad(hours) }:` : ""}{minutes ? `${zeroPad(minutes)} :` : ""}{zeroPad(seconds)}</span>;
}
};

export default function CountDownComponent({ timeDifference }: { timeDifference: number }) {
  return <Countdown date={Date.now() + timeDifference} renderer={renderer}/>
}

