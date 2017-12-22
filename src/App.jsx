import Method from "./components/Method.jsx";
import Obstacle from "./components/Obstacle.jsx";
import Vision from "./components/Vision.jsx";
import Values from "./components/Values.jsx";

export default class App extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div>
          <Vision/>
          <Values/>
          <Method/>
          <Obstacle/>
        </div>
      );
    }
}
