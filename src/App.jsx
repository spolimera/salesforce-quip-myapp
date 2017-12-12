import Method from "./components/Method.jsx";
import Obstacle from "./components/Obstacle.jsx";

export default class App extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div>
          <Method/>
          <Obstacle/>
        </div>
      );
    }
}
