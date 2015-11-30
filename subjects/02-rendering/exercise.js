////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - render DATA.title in an <h1>
// - render a <ul> with each of DATA.items as an <li>
// - now only render an <li> for mexican food (hint: use DATA.items.filter(...))
// - sort the items in alphabetical order by name (hint: use sort-by https://github.com/staygrimm/sort-by#example)
//
// Got extra time?
// - add a select dropdown to make filtering on `type` dynamic
// - add a button to toggle the sort order
// - Hint: you'll need an `updateThePage` function that calls `React.render`,
//   and then you'll need to call it in the event handlers of the form controls
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import ReactDOM from 'react-dom'
import sortBy from 'sort-by'

const DATA = {
  title: 'Menu',
  items: [
    { id: 1, name: 'tacos', type: 'mexican' },
    { id: 2, name: 'burrito', type: 'mexican' },
    { id: 3, name: 'tostada', type: 'mexican' },
    { id: 4, name: 'hush puppies', type: 'southern' },
  ]
}

const allItemTypes = DATA.items.reduce(function(all, one) {
  if(all.indexOf(one) === -1) {
    all.push(one.type);
  }

  return all;
}, []);

var sortReversed = false;
var type = 'mexican';

function Menu() {
  return (
    <div>
      <h1>{DATA.title}</h1>
      <ul>
        {DATA.items.filter(function(item) {
          return item.type === type;
        }).sort(sortBy((sortReversed ? '-' : '') + 'name')).map(function(item) {
          return <li key={item.id}>{item.name}</li>;
        })}
      </ul>
      <select onChange={swapType}>
        {allItemTypes.map(function(itemType) {
          return <option key={itemType}>{itemType}</option>;
        })}
      </select>
      <button onClick={swapSort}>swap sort order</button>
    </div>
  )
}

const swapSort = function() {
  sortReversed = !sortReversed;
  render();
}

const swapType = function(select) {
  type = select.currentTarget.value;
  render();
}

const render = function(test) {
  ReactDOM.render(<Menu />, document.getElementById('app'), test || function() {});
}

render(function () {
  require('./tests').run()
});