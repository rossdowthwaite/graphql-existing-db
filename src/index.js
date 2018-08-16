const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding')

// let Links = [{
//     id: 'link-0',
//     url: 'www.howtographql.com',
//     description: 'Fullstack tutorial for GraphQL',
// }];

const resolvers = {
    Query: {
        info: () => `Info info info`,
        feed: (root, args, context, info) => {
            return context.db.query.links({}, info);
        },
    },
    Mutation: {
        post: (root, args, context, info) => {
            return context.db.mutation.createLink({
                data: {
                    url: args.url,
                    description: args.description
                }
            });
        },
    }
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: (req) => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://eu1.prisma.sh/ross-dowthwaite-71fa7c/database/dev',
            secret: 'mysecret123',
            debug: true
        }),
    }),
});

server.start( () => console.log(`Server is running on http://localhost:4000`));