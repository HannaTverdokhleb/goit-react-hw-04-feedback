import {useState} from 'react';
import FeedbackOptions from 'components/FeedbackOptions/FeedbackOptions';
import Statistics from 'components/Statistics/Statistics';
import Notification from "components/Notification/Notification";
import Section from 'components/Section/Section';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const getTotal = () => {
    return good + neutral + bad;
  }

  let total = getTotal();
  
  const getPositivePercentage = () => {
    let result = good * 100 / (total ? total : 1);
    return Math.round(parseFloat(result) * 100) / 100;
  }

  const leaveFeedback = (option) => {
    switch(option) {
      case 'good':
        setGood(prevState => (prevState +1));
        break;

      case 'neutral':
        setNeutral(prevState => (prevState +1));
        break;

      case 'bad':
        setBad(prevState => (prevState +1));
        break;

      default: 
        return;
    }
     
  }

  let feedbackOptions = Object.keys({good, neutral, bad});
  let positivePercentage = getPositivePercentage();
  return (
    <div className="container">
      <Section title="Please leave feedback">
        <FeedbackOptions options={feedbackOptions} onLeaveFeedback={leaveFeedback} />
      </Section>
      <Section title="Statistics">
        {
          total ? 
            <Statistics good={good} neutral={neutral} bad={bad} total={total} positivePercentage={positivePercentage} />
          :
            <Notification message="Please leave feedback" />
        }
      </Section>
    </div>
  )

}

export default App;