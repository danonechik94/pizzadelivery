import _range from 'lodash/range';

export const FULL_ITEMS_LIST = [
    // Combo category
    ..._range(5).map(itemIndex => ({
        id: `combo_${itemIndex}`,
        name: `Combo ${itemIndex}`,
        type: 'combo',
        items: [
            { id: 'pizza_1', type: 'pizza', name: 'Pizza 1' },
            { id: 'drink_1', type: 'drink', name: 'Drink 1' },
            { id: 'snack_1', type: 'snack', name: 'Snack 1' },
        ],
        price: {
            base: 10,
        },
    })),

    // Pizza category
    ..._range(15).map(itemIndex => ({
        id: `pizza_${itemIndex}`,
        name: `Pizza ${itemIndex}`,
        type: 'pizza',
        description: 'Spicy pepperoni, tomato sauce, sweet pepper, mozzarella',
        price: {
            base: 5,
            thin: 1,
            cheese: 1,
        },
    })),

    // Drinks category
    ..._range(3).map(itemIndex => ({
        id: `drink_${itemIndex}`,
        name: `Drink ${itemIndex}`,
        type: 'drink',
        description: '0.5L',
        price: {
            base: 2,
        }
    })),

    // Snacks category
    ..._range(8).map(itemIndex => ({
        id: `snack_${itemIndex}`,
        name: `Snack ${itemIndex}`,
        type: 'snack',
        description: 'Baked Potato with Chicken, Blue Cheese, Tomatoes and Cheese Sauce',
        price: {
            base: 3
        }
    })),
];