import React, {Component} from 'react'

// Here you could just use a functional component for better performance:
//
// export default function () {
//   return (
//     <footer>
//       Upframe &trade; 2018
//     </footer>
//   )
// }

export default class Footer extends Component {
  // This constructor is just useless. Take a look at linting issues.
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <footer>
        Upframe &trade; 2018
      </footer>
    )
  }
}
