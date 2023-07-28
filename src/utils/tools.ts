export function buildNestedStructure(data: any[]) {
  const map: any = {}; // 用來快速查找 id 對應的物件
  const result: any[] = []; // 最終的結果

  // 將原始資料放入 map 中
  data.forEach((item) => {
    map[item.id] = item;
    item.children = []; // 初始化 children 屬性
  });

  // 將每個 item 放到對應的 parent 的 children 中
  data.forEach((item) => {
    if (item.parentMenu !== '') {
      const parent = map[item.parentMenu];
      if (parent) {
        parent.children.push(item);
      }
    } else {
      result.push(item); // 沒有 parentMenu 的 item 是根節點，放到最終結果中
    }
  });

  return result;
}

export function buildMenuNestedStructure(data: any[]) {
  const map: any = {}; // 用來快速查找 id 對應的物件
  const result: any[] = []; // 最終的結果

  // 將原始資料放入 map 中
  data.forEach((item) => {
    map[item.id] = item;
    item.children = undefined; // 初始化 children 屬性
  });

  // 將每個 item 放到對應的 parent 的 children 中
  data.forEach((item) => {
    if (item.parentMenu !== '') {
      const parent = map[item.parentMenu];
      if (parent) {
        if (parent.children) {
          parent.children.push(item);
        } else {
          parent.children = [item];
        }
      }
    } else {
      result.push(item); // 沒有 parentMenu 的 item 是根節點，放到最終結果中
    }
  });

  return result;
}
