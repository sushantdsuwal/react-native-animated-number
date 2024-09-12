import {View, Button} from 'react-native';
import React, {useState} from 'react';
import AnimatedNumber from 'rn-animated-number';

export default function App() {
  const [number, setNumber] = useState(1234);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        gap: 8,
      }}>
      <AnimatedNumber
        value={1234.56}
        textStyle={{color: 'green', fontWeight: 'bold', fontSize: 50}}
        formatter={() =>
          Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(number)
        }
        animationConfig={{stagger: 100, damping: 50, stiffness: 200}}
      />
      <AnimatedNumber
        value={number}
        textStyle={{color: 'red', fontWeight: 'bold', fontSize: 40}}
        formatter={val => `${val}%`}
      />
      <AnimatedNumber
        value={number}
        textStyle={{color: 'blue', fontWeight: 'bold', fontSize: 60}}
        animationConfig={{
          stagger: 120, // delay between animating each digit
          damping: 100, // less bounciness
          stiffness: 300, // faster motion
        }}
      />
      <Button
        onPress={() => setNumber(Math.floor(Math.random() * 990000) + 9999)}
        title="Generate Random Number"
      />
    </View>
  );
}
