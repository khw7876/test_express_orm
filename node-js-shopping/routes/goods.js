const express = require("express");
const router = express.Router();

const {Op} = require("sequelize");
const authmiddleware = require("../middlewares/auth-middleware");

const {Goods} = require("../models/goods");
const {Cart} = require("../models/carts");
// const User = require("../models/user_deleted");
// const goods = require("../models/goods");
const { addListener } = require("../app");

// url : /goods/cart
router.get("/cart", authmiddleware, async(req, res) => {
    const { userId } = res.locals.user;


    const cart = await Cart.findAll({
      where : {userId},
    });
  
    const goodsIds = cart.map((c) => c.goodsId);
    
    // 루프 줄이기 위해 Mapping 가능한 객체로 만든것
    const goodsKeyById = await Goods.findAll({
      where: {
        goodsId: goodsIds,
      },
    })
      .then((goods) =>
        goods.reduce(
          (prev, g) => ({
            ...prev,
            [g.goodsId]: g,
          }),
          {}
        )
      );
  
    res.send({
      cart: cart.map((c) => ({
        quantity: c.quantity,
        goods: goodsKeyById[c.goodsId],
      })),
    });
  });
  
// url : /goods/:goodsId/cart"

router.put("/:goodsId/cart", authmiddleware, async(req, res) => {
    const author = res.locals.user;
    const {goodsId} = req.params;
    const {quantity} = req.body;

    const is_cart = await Cart.findOne({
      where : {
        author,
        goodsId
      }
    });
    if(is_cart){
        is_cart.quantity = quantity;
        await is_cart.save();
    }
    else{
        const cart = Cart.create({
            author,
            goodsId,
            quantity
        });

        res.send({});
    }
});

// url : "/goods/:goodsId/cart"
router.delete(":goodsId/cart", async(req,res) => {
    const { userId } = res.locals.user;
    const { goodsId } = req.params;

    const delete_cart = Cart.findOne({
      where : {
        userId,
        goodsId
      },
    });
    if(delete_cart){
        await delete_cart.destroy();
    }
    res.send({});
});

router.get("/goods/:goodsId", async (req, res) => {
  const { goodsId } = req.params;
  const goods = await Goods.findByPk(goodsId);

  if (!goods) {
    res.status(404).send({});
  } else {
    res.send({ goods });
  }
});


module.exports = router;