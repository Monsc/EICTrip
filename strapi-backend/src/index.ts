// 自动生成，增加示例线路 seed 逻辑
import type { Strapi } from '@strapi/types';

export default {
  // 预留扩展
  register(/* { strapi }: { strapi: Strapi } */) {},

  // 启动时自动插入示例数据（仅在 routes 为空时执行一次）
  bootstrap: async ({ strapi }: { strapi: Strapi }) => {
    const existing = await strapi.entityService.count('api::route.route');
    if (existing > 0) {
      strapi.log.info(`Seed skipped: 已存在 ${existing} 条路线`);
      return;
    }

    strapi.log.info('Seed: 插入示例线路');

    const sample = [
      {
        title: '日本樱花 · 东京-京都6日精品游',
        slug: 'japan-sakura-6d',
        description: '赏樱花、泡温泉、品怀石。东京-富士山-京都精华 6 日打卡。',
        price: '¥8999 起',
        tags: '亚洲,日本,樱花',
      },
      {
        title: '巴尔干三国秘境 · 塞尔维亚-波黑-黑山8日',
        slug: 'balkan-3countries-8d',
        description: '穿越最后的欧洲秘境，感受多元宗教与壮丽山海。',
        price: '¥15999 起',
        tags: '欧洲,巴尔干,探秘',
      },
      {
        title: '瑞法意经典 9 日 · 少女峰+卢浮宫+威尼斯',
        slug: 'europe-classic-9d',
        description: '深度纵览法瑞意三国，阿尔卑斯雪山与艺术人文完美结合。',
        price: '¥25999 起',
        tags: '欧洲,艺术,雪山',
      },
      {
        title: '澳大利亚大堡礁 · 悉尼-凯恩斯8日',
        slug: 'australia-reef-8d',
        description: '登陆南半球，浮潜世界遗产，邂逅考拉与袋鼠。',
        price: '¥15999 起',
        tags: '大洋洲,潜水,自然',
      },
      {
        title: '新西兰全景 · 北岛南岛10日',
        slug: 'newzealand-panorama-10d',
        description: '冰川峡湾与毛利文化交相辉映，探秘纯净中土世界。',
        price: '¥17999 起',
        tags: '大洋洲,探险,自驾',
      },
      {
        title: '迪拜奢华体验 6 日 · 帆船酒店+沙漠冲沙',
        slug: 'dubai-luxury-6d',
        description: '极致奢华与阿拉伯风情并存，尽享购物与冒险乐趣。',
        price: '¥16999 起',
        tags: '中东,奢华,沙漠',
      },
    ];

    for (const data of sample) {
      await strapi.entityService.create('api::route.route', { data });
    }
    strapi.log.info('Seed: 示例线路创建完毕');
  },
};
