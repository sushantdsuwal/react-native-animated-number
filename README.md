# React Native Animated Number

A customizable animated text component for React Native that supports animated numbers, currencies, and percentages.

![myfile](https://github.com/sushantdsuwal/react-native-animated-number/blob/main/example.gif)



## Installation

```bash
npm install rn-animated-number
```

## prerequisites

```bash
npm install react-native-reanimated
```
[react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/) dependency is required for this package. Make sure to install it before using this package.


|  props | Type  | Default   | Description  |
|---|---|---|---|
|  value | number,string  | Required   |  The value to animate. This can be a number or a string. |
| textStyle  | TextStyle  | { fontSize: 30 }	  |  Custom style for the text. The default font size is 30. |
| formatter  | (value: number | string) => string	  | (val) => val.toString()	  | Function to format the value (e.g., for currencies, percentages). |
| animationConfig  | object  | { stagger: 50, damping: 80, stiffness: 200 }	  | Configuration for the animation, including stagger, damping, and stiffness. |


**animationConfig** Details:
`stagger`: The delay between animating each digit/character (in milliseconds).
`damping`: Controls the "bounciness" of the spring animation (higher values make it less bouncy).
`stiffness`: Controls how stiff the spring is (higher values result in faster motion).

## Examples

### Currency Example

```bash
<AnimatedNumber
  value={1234.56}
  textStyle={{ color: 'green', fontWeight: 'bold', fontSize: 50 }}
  formatter={(val) => Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)}
  animationConfig={{ stagger: 100, damping: 50, stiffness: 200 }}
/>
```

### Percentage Example

```bash
<AnimatedNumber
  value={75}
  textStyle={{ color: 'red', fontWeight: 'bold', fontSize: 40 }}
  formatter={(val) => `${val}%`}
/>
```


### Custom Animation Config Example
You can customize the animation behavior by providing your own ``animationConfig``.

```bash
<AnimatedNumber
  value={9876}
  textStyle={{ color: 'blue', fontWeight: 'bold', fontSize: 60 }}
  animationConfig={{
    stagger: 120, // delay between animating each digit
    damping: 100, // less bounciness
    stiffness: 300, // faster motion
  }}
/>
```
