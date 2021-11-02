import React, { FunctionComponent, ReactNode, useCallback } from 'react';
import { Alert, Dimensions, FlatList, StyleSheet, View } from 'react-native';
const TOTAL_ITEM_WIDTH = Dimensions.get('screen').width;

type TaskType = {
  id: number;
  title: string;
  desc: string;
  imageURL?: string;
  videoURL?: string;
  type: 'video' | 'image' | 'news' | 'record'
};

type CarouselProps = {
  data: {
    tasks: TaskType[];
    id: number;
    title: string;
    progress: number;
  };
  renderCarouselItem: (item: TaskType, index: number) => ReactNode,
  onVisibleItem: (index: number) => void
};

const Carousel: React.FC<CarouselProps> = ({ data, renderCarouselItem, onVisibleItem }) => {
  const [currentProgress, setCurrentProgress] = React.useState(data.progress);

  React.useEffect(() => {
    return () => onVisibleItem(currentProgress)
  }, [currentProgress]);

  const renderItem: React.FC<{ item: TaskType, index: number }> = ({ item, index }) => <View style={styles.card}>{renderCarouselItem(item, index)}</View>
  
  const onViewRef = React.useCallback(({ viewableItems }: any) => {
    setCurrentProgress(viewableItems[0]?.index)
  }, []);

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })

  return (
    <>
      <FlatList
        initialScrollIndex={currentProgress}
        onViewableItemsChanged={onViewRef}
        viewabilityConfig={viewConfigRef.current}
        data={data?.tasks}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        removeClippedSubviews
        windowSize={2}
        keyExtractor={useCallback((item) => String(item.id), [])}
        getItemLayout={useCallback(
          (data, index) => ({
            length: TOTAL_ITEM_WIDTH,
            offset: index * TOTAL_ITEM_WIDTH,
            index,
          }),
          [],
        )}
        snapToInterval={TOTAL_ITEM_WIDTH}
        decelerationRate="fast"
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: TOTAL_ITEM_WIDTH,
    backgroundColor: 'black',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

Carousel.defaultProps = {
  data: {
    tasks: [
      {
        id: 1,
        title: 'test title for video',
        desc: 'some description about test video card',
        type: 'video',
      },
      {
        id: 2,
        title: 'test title for news',
        desc: 'some description about test news card',
        type: 'news' 
      },
      {
        id: 3,
        title: 'test title for image',
        desc: 'some description about test image card',
        type: 'image'
      },
    ],
    progress: 0,
    id: 1,
    title: 'Task 1'
  },
};
export default Carousel;