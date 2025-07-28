// strapi-backend/src/api/stripe/controller.js
'use strict';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // 你的sk_test_xxx

module.exports = {
  async createCheckoutSession(ctx) {
    const { orderId, amount, currency = 'usd', email } = ctx.request.body;
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency,
            product_data: {
              name: `Order #${orderId}`,
            },
            unit_amount: Math.round(amount * 100), // 单位为分
          },
          quantity: 1,
        }],
        mode: 'payment',
        customer_email: email,
        success_url: `${process.env.FRONTEND_URL}/orders/${orderId}?pay=success`,
        cancel_url: `${process.env.FRONTEND_URL}/orders/${orderId}?pay=cancel`,
        metadata: { orderId },
      });
      ctx.send({ id: session.id, url: session.url });
    } catch (err) {
      ctx.throw(500, err.message);
    }
  },

  async webhook(ctx) {
    const sig = ctx.request.headers['stripe-signature'];
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        ctx.request.rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET // 你的webhook secret
      );
    } catch (err) {
      ctx.status = 400;
      ctx.body = `Webhook Error: ${err.message}`;
      return;
    }

    // 只处理支付成功事件
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const orderId = session.metadata.orderId;
      // 更新订单状态
      await strapi.db.query('api::order.order').update({
        where: { id: orderId },
        data: { paymentStatus: 'paid', status: 'paid' },
      });
    }

    ctx.send({ received: true });
  },
};