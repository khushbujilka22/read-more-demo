import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

const TextWithReadMore = props => {
  const {value, initialNumberOfLines} = props;

  const [showReadMore, setShowReadMore] = useState(false);
  const [showExpandedView, setShowExpandedView] = useState(false);

  const onPressText = () => {
    setShowExpandedView(true);
  };

  const onTextLayout = async eventData => {
    if (showReadMore && !showExpandedView) {
      return;
    }
    if (eventData.nativeEvent.lines?.length >= initialNumberOfLines) {
      let isHasLongText = false;
      await eventData.nativeEvent.lines.map((item, index) => {
        if (initialNumberOfLines == 1) {
          if (value.length > eventData.nativeEvent.lines[0].text.length - 1) {
            isHasLongText = true;
          }
          return;
        }

        if (index !== 0 && index >= eventData.nativeEvent.lines?.length - 1) {
          let isFirstLineIsLargeThanSecond =
            eventData.nativeEvent.lines[0].text.length >
            eventData.nativeEvent.lines[1].text.length;
          let lineLengthToCompare = isFirstLineIsLargeThanSecond
            ? eventData.nativeEvent.lines[0].text.length
            : eventData.nativeEvent.lines[1].text.length;

          if (
            item.text.length >= lineLengthToCompare ||
            item?.text?.includes('\n')
          ) {
            isHasLongText = true;
          }
        }
      });
      if (isHasLongText) {
        setShowReadMore(true);
      }
    }
  };

  return (
    <View>
      <Text
        onPress={onPressText}
        suppressHighlighting
        numberOfLines={showExpandedView ? 0 : initialNumberOfLines}
        onTextLayout={onTextLayout}
        style={styles.textValue}>
        {`${value}`}
      </Text>

      {showReadMore && !showExpandedView ? (
        <Text
          suppressHighlighting
          onPress={onPressText}
          style={styles.readMoreText}>{`${'...read more'}`}</Text>
      ) : null}
    </View>
  );
};

export default () => {
  return (
    <View style={styles.container}>
      <TextWithReadMore
        value={`${`React primitives render to native platform UI meaning your app uses the same native platform APIs other apps do. Many platforms,  one React. Create platform-specific versions of components so a single codebase can share code across platforms. With React Native, one team can maintain two platforms and share a common technology—React.`}`}
        initialNumberOfLines={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textValue: {
    marginTop: 100,
    marginHorizontal: 30,
    fontSize: 14,
  },
  readMoreText: {
    fontSize: 12,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    right: 30,
    backgroundColor: '#fff',
  },
});
