# Random User Display Table

[![Netlify Status](https://api.netlify.com/api/v1/badges/d3f3f3d9-e8bf-494e-a682-8569574ab600/deploy-status)](https://app.netlify.com/sites/wondrous-maamoul-a96616/deploys)

[Live Preview](https://wondrous-maamoul-a96616.netlify.app/)

This project is about displaying the results from `https://randomuser.me/api` free API with simple table from Chakra UI. The features includes:
- Search (Debounce)
- Filter by Gender
- Sort by header
- Pagination

![Table Preview](https://i.ibb.co/ykdWjr4/Screenshot-2022-07-18-195126.png)

## How to Use

This project developed with Gatsby.js to since it only a client-side works with a minimum resources. Please head to [Gatsby.js Documentation](https://www.gatsbyjs.com/docs/) for more details about Routing, Querying, Styling, etc.

To build the project, you can run this command:

```bash
npm run build
```

For the development and live preview, you can execute this command:

```bash
npm run develop
```

## Unit Testing

This project only have Unit Testing set up. Hence, run this command to see the current UT state.

```bash
npm run test
```

Run this command to see the code coverage results:

```bash
npm run test:coverage
```

Run this command to see the test while development:

```bash
npm run test:watch
```

## Performance

This project already implement some of Gatsby.js Best Practices to improve the site performance such as using Preact plugin and Bundle Profiling.

Please refer to this documentation for more details [Performance and Scaling](https://www.gatsbyjs.com/docs/how-to/performance/).