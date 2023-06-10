import Countdown, { zeroPad} from 'react-countdown'


type Renderer = {
  hours: number,
  minutes: number,
  seconds: number,
  completed: boolean
}
const renderer = ({ hours, minutes, seconds, completed }: Renderer) => {
  const Completionist = () => <span className="text-green-500">SOLD</span>;
  if (completed) {
    // Render a completed state
  return <Completionist />;
} else {
  // Render a countdown
  return <span suppressHydrationWarning={true}>{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
}
};

export default function CountDownComponent({ timeDifference }: {timeDifference: number}) {
  return <Countdown date={Date.now() + timeDifference} renderer={renderer}/>
}

