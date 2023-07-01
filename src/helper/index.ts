export const priceTranslationFn = (price: string) => `${price ? `$${price}/月`: '价格待议'}`;

const thresholds = [
    {
      val: 1000 * 60 * 1,
      text: '刚刚',
    },
    {
      val: 1000 * 60 * 60,
      text: '分钟前',
    },
    {
      val: 1000 * 60 * 60 * 24,
      text: '小时前',
    },
    {
      val: 1000 * 60 * 60 * 24 * 30,
      text: '天前',
    },
    {
      val: 1000 * 60 * 60 * 24 * 365,
      text: '个月前',
    },
    {
      val: 1000 * 60 * 60 * 24 * 365,
      text: '年前',
    },
  ].reverse();
  
export const getDateDiff = (pre: string, curr = new Date()) => {
    const preTime = new Date(pre).getTime();
    const currTime = new Date(curr).getTime();
    const diff = currTime - preTime;
    let surfix = '';
    let prefix = '';
    thresholds.some(eachT => {
      surfix = eachT.text;
      prefix = `${Math.floor(diff / eachT.val)}`;
      if (eachT.val < diff) {
        if (eachT.val === 1000 * 60 * 1) {
          prefix = '';
        }
        return true;
      }
    });
    return `${prefix} ${surfix}`;
  };