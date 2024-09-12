import React from 'react';
import { Text, View, TextStyle } from 'react-native';
import Animated, { FadeInDown, FadeInUp, useAnimatedStyle, withSpring, withDelay } from 'react-native-reanimated';

interface AnimatedNumberProps {
  value: number | string;
  textStyle?: TextStyle;
  formatter?: (value: number | string) => string;
  animationConfig?: {
    stagger?: number;
    damping?: number;
    stiffness?: number;
  };
}

interface ColumnProps {
  textStyle?: TextStyle;
  value: number;
  index: number;
  animationConfig?: {
    stagger?: number;
    damping?: number;
    stiffness?: number;
  };
}

const defaultAnimationConfig = {
  stagger: 50,
  damping: 80,
  stiffness: 200,
};

const numberToTen = [...Array(10).keys()];

const getFontSize = (textStyle: TextStyle | undefined) => {
  return textStyle?.fontSize ?? 30;
};

const AnimatedCharacter = ({ character, textStyle }: { character: string | number; textStyle?: TextStyle }) => {
  const fontSize = getFontSize(textStyle);

  return (
    <Text
      style={[
        {
          fontSize: fontSize,
          lineHeight: fontSize * 1,
          fontWeight: 'bold',
        },
        textStyle,
      ]}
      key={`character-item-${character}`}
    >
      {character}
    </Text>
  );
};

const AnimatedColumn = ({ value, index, textStyle, animationConfig = defaultAnimationConfig }: ColumnProps) => {
  const fontSize = getFontSize(textStyle);
  const { stagger, damping, stiffness } = animationConfig;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withDelay(
            (stagger || defaultAnimationConfig.stagger) * index,
            withSpring(-value * fontSize, {
              damping: damping,
              stiffness: stiffness,
            })
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={{
        height: fontSize,
        overflow: 'hidden',
      }}
      entering={FadeInDown.springify().damping(20).stiffness(200)}
      exiting={FadeInUp.springify().damping(20).stiffness(200)}
    >
      <Animated.View style={[animatedStyle]}>
        {numberToTen.map((number) => (
          <AnimatedCharacter key={number} character={number} textStyle={textStyle} />
        ))}
      </Animated.View>
    </Animated.View>
  );
};

const AnimatedNumber = ({
  value,
  textStyle,
  formatter = (val: number | string) => val.toString(),
  animationConfig = defaultAnimationConfig,
}: AnimatedNumberProps) => {
  const formattedValue = formatter(value);

  const splitValue = formattedValue.split('');

  return (
    <View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {splitValue.map((character, index) => {
          if (!isNaN(Number(character))) {
            return (
              <AnimatedColumn
                key={index}
                index={index}
                value={parseInt(character)}
                textStyle={textStyle}
                animationConfig={animationConfig}
              />
            );
          } else {
            return <AnimatedCharacter key={index} character={character} textStyle={textStyle} />;
          }
        })}
      </View>
    </View>
  );
};

export default AnimatedNumber;
