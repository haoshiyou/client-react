// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '好室友™平台' };
}

export const layout = () => {
  return {
    logo: 'http://www.haoshiyou.org/assets/res/icon.png',
    menu: {
      locale: false,
    },
  };
};
