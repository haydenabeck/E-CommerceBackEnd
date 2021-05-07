const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categories = await Category.findByPk(req.params.id, {
      include: [Product],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categories = await Category.create({
      category_id: req.body.category_id,
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  console.log('UPDATE CATEGORY@')
  // update a category by its `id` value
  try {
    console.log('REQ.body!!!', req.body)
    console.log('id paramsss', req.params)

    // Category.update(
    //   { category_name: req.body.category_names },
    //   { where: { id: req.params.id } }
    // ).then(function(data) {
    //   res.json(data)
    // }).catch(function(err) {
    //   console.log('errrrr', err)

    // })
      
    const categories = await Category.update( req.body, {
      where: {
        id: req.params.id,
      },
    });
    console.log('category!! we found', categories)

    if (categories[0]=== 0) {
      console.log('we did not find categorys', categories)
      res.status(404).json({ message: 'No categories found with that id'});
    } else {
      res.status(200).json(categories);
    }
    
  } catch (err) {
    console.log('ERRR!~', err)
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categories = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categories) {
      res.status(404).json({ message: 'No categories found with that id'});
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
