import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Rect, Defs, Pattern, Image as SvgImage } from 'react-native-svg';

const DropArrow = () => {
  return (
    <View style={styles.container}>
      <Svg width="25" height="25" viewBox="0 0 100 100" fill="none">
        <Rect width="100" height="100" fill="url(#pattern0)" />
        <Defs>
          <Pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
            <SvgImage
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAABWUlEQVR4nO3YwYoaQRCA4Y4vUMsYq1d33jsn80CBZW97yMsYGhKyEJM4EGPt+H0wR5kufxukWgMAAAAAAAAAAAAAAAAAAOCc7XZ7mOd5qvbtzPM8jbO1e7Lb7R4z87X3/nI4HLatiIh4yMwvvfev0zQ9tTuLcfr+lIgSP2P8ONf6o5yJUSJK/Bpj/VH+EOOmUeL3MdYb5YIYN4kSf4+xvij7/f7jGOiCoU/jyczn//Hva7xjvOvSc40ZxixtBT703j8tGPx07Zuy4Ga8/aF8bq1t2kqUiRJi1IkSYtSJEmLUiRJi1IkSYtSJEmLUiRJi1IkSYtSJEmLUiRJi1IkSYlzNJjOPS6KMJeHCReH4zHFNu6mKN+V0r4vCdx0lxagTJcWoc1NSjDpRUow6UVKMOlFSjDpRUow6UVKMOlFSjDpRUow6UVKMUjZ2UwAAAAAAAAAAAABA+4e+AZyWzzQbnvQaAAAAAElFTkSuQmCC"
              width="100"
              height="100"
              transform="scale(0.01)"
            />
          </Pattern>
        </Defs>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
});

export default DropArrow;
