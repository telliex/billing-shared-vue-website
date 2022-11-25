import { ref } from 'vue';
// 每行個數
export const grid = ref(12);
// slider屬性
export const useSlider = (min = 6, max = 12) => {
  // 每行顯示個數滑動條
  const getMarks = () => {
    const l = {};
    for (let i = min; i < max + 1; i++) {
      l[i] = {
        style: {
          color: '#fff',
        },
        label: i,
      };
    }
    return l;
  };
  return {
    min,
    max,
    marks: getMarks(),
    step: 1,
  };
};
