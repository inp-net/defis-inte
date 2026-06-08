
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model GroupClub
 * 
 */
export type GroupClub = $Result.DefaultSelection<Prisma.$GroupClubPayload>
/**
 * Model GroupInte
 * 
 */
export type GroupInte = $Result.DefaultSelection<Prisma.$GroupIntePayload>
/**
 * Model Proof
 * 
 */
export type Proof = $Result.DefaultSelection<Prisma.$ProofPayload>
/**
 * Model Challenge
 * 
 */
export type Challenge = $Result.DefaultSelection<Prisma.$ChallengePayload>
/**
 * Model Location
 * 
 */
export type Location = $Result.DefaultSelection<Prisma.$LocationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UploadType: {
  PHOTO: 'PHOTO',
  VIDEO: 'VIDEO',
  TEXT: 'TEXT'
};

export type UploadType = (typeof UploadType)[keyof typeof UploadType]


export const Status: {
  PENDING: 'PENDING',
  VALID: 'VALID',
  DENIED: 'DENIED'
};

export type Status = (typeof Status)[keyof typeof Status]

}

export type UploadType = $Enums.UploadType

export const UploadType: typeof $Enums.UploadType

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.groupClub`: Exposes CRUD operations for the **GroupClub** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GroupClubs
    * const groupClubs = await prisma.groupClub.findMany()
    * ```
    */
  get groupClub(): Prisma.GroupClubDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.groupInte`: Exposes CRUD operations for the **GroupInte** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GroupIntes
    * const groupIntes = await prisma.groupInte.findMany()
    * ```
    */
  get groupInte(): Prisma.GroupInteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.proof`: Exposes CRUD operations for the **Proof** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Proofs
    * const proofs = await prisma.proof.findMany()
    * ```
    */
  get proof(): Prisma.ProofDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.challenge`: Exposes CRUD operations for the **Challenge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Challenges
    * const challenges = await prisma.challenge.findMany()
    * ```
    */
  get challenge(): Prisma.ChallengeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.location`: Exposes CRUD operations for the **Location** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Locations
    * const locations = await prisma.location.findMany()
    * ```
    */
  get location(): Prisma.LocationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    GroupClub: 'GroupClub',
    GroupInte: 'GroupInte',
    Proof: 'Proof',
    Challenge: 'Challenge',
    Location: 'Location'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "groupClub" | "groupInte" | "proof" | "challenge" | "location"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      GroupClub: {
        payload: Prisma.$GroupClubPayload<ExtArgs>
        fields: Prisma.GroupClubFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupClubFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupClubPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupClubFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupClubPayload>
          }
          findFirst: {
            args: Prisma.GroupClubFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupClubPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupClubFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupClubPayload>
          }
          findMany: {
            args: Prisma.GroupClubFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupClubPayload>[]
          }
          create: {
            args: Prisma.GroupClubCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupClubPayload>
          }
          createMany: {
            args: Prisma.GroupClubCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupClubCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupClubPayload>[]
          }
          delete: {
            args: Prisma.GroupClubDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupClubPayload>
          }
          update: {
            args: Prisma.GroupClubUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupClubPayload>
          }
          deleteMany: {
            args: Prisma.GroupClubDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupClubUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupClubUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupClubPayload>[]
          }
          upsert: {
            args: Prisma.GroupClubUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupClubPayload>
          }
          aggregate: {
            args: Prisma.GroupClubAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroupClub>
          }
          groupBy: {
            args: Prisma.GroupClubGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupClubGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupClubCountArgs<ExtArgs>
            result: $Utils.Optional<GroupClubCountAggregateOutputType> | number
          }
        }
      }
      GroupInte: {
        payload: Prisma.$GroupIntePayload<ExtArgs>
        fields: Prisma.GroupInteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupInteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupIntePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupInteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupIntePayload>
          }
          findFirst: {
            args: Prisma.GroupInteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupIntePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupInteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupIntePayload>
          }
          findMany: {
            args: Prisma.GroupInteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupIntePayload>[]
          }
          create: {
            args: Prisma.GroupInteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupIntePayload>
          }
          createMany: {
            args: Prisma.GroupInteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupInteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupIntePayload>[]
          }
          delete: {
            args: Prisma.GroupInteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupIntePayload>
          }
          update: {
            args: Prisma.GroupInteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupIntePayload>
          }
          deleteMany: {
            args: Prisma.GroupInteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupInteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupInteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupIntePayload>[]
          }
          upsert: {
            args: Prisma.GroupInteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupIntePayload>
          }
          aggregate: {
            args: Prisma.GroupInteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroupInte>
          }
          groupBy: {
            args: Prisma.GroupInteGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupInteGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupInteCountArgs<ExtArgs>
            result: $Utils.Optional<GroupInteCountAggregateOutputType> | number
          }
        }
      }
      Proof: {
        payload: Prisma.$ProofPayload<ExtArgs>
        fields: Prisma.ProofFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProofFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProofFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofPayload>
          }
          findFirst: {
            args: Prisma.ProofFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProofFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofPayload>
          }
          findMany: {
            args: Prisma.ProofFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofPayload>[]
          }
          create: {
            args: Prisma.ProofCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofPayload>
          }
          createMany: {
            args: Prisma.ProofCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProofCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofPayload>[]
          }
          delete: {
            args: Prisma.ProofDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofPayload>
          }
          update: {
            args: Prisma.ProofUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofPayload>
          }
          deleteMany: {
            args: Prisma.ProofDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProofUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProofUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofPayload>[]
          }
          upsert: {
            args: Prisma.ProofUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProofPayload>
          }
          aggregate: {
            args: Prisma.ProofAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProof>
          }
          groupBy: {
            args: Prisma.ProofGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProofGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProofCountArgs<ExtArgs>
            result: $Utils.Optional<ProofCountAggregateOutputType> | number
          }
        }
      }
      Challenge: {
        payload: Prisma.$ChallengePayload<ExtArgs>
        fields: Prisma.ChallengeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChallengeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChallengeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          findFirst: {
            args: Prisma.ChallengeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChallengeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          findMany: {
            args: Prisma.ChallengeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>[]
          }
          create: {
            args: Prisma.ChallengeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          createMany: {
            args: Prisma.ChallengeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChallengeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>[]
          }
          delete: {
            args: Prisma.ChallengeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          update: {
            args: Prisma.ChallengeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          deleteMany: {
            args: Prisma.ChallengeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChallengeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChallengeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>[]
          }
          upsert: {
            args: Prisma.ChallengeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          aggregate: {
            args: Prisma.ChallengeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChallenge>
          }
          groupBy: {
            args: Prisma.ChallengeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChallengeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChallengeCountArgs<ExtArgs>
            result: $Utils.Optional<ChallengeCountAggregateOutputType> | number
          }
        }
      }
      Location: {
        payload: Prisma.$LocationPayload<ExtArgs>
        fields: Prisma.LocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findFirst: {
            args: Prisma.LocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findMany: {
            args: Prisma.LocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          create: {
            args: Prisma.LocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          createMany: {
            args: Prisma.LocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          delete: {
            args: Prisma.LocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          update: {
            args: Prisma.LocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          deleteMany: {
            args: Prisma.LocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          upsert: {
            args: Prisma.LocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          aggregate: {
            args: Prisma.LocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocation>
          }
          groupBy: {
            args: Prisma.LocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocationCountArgs<ExtArgs>
            result: $Utils.Optional<LocationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    groupClub?: GroupClubOmit
    groupInte?: GroupInteOmit
    proof?: ProofOmit
    challenge?: ChallengeOmit
    location?: LocationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    group: number
    groupBoard: number
    proof: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | UserCountOutputTypeCountGroupArgs
    groupBoard?: boolean | UserCountOutputTypeCountGroupBoardArgs
    proof?: boolean | UserCountOutputTypeCountProofArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGroupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupClubWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGroupBoardArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupClubWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProofArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProofWhereInput
  }


  /**
   * Count Type GroupClubCountOutputType
   */

  export type GroupClubCountOutputType = {
    users: number
    board: number
    challenge: number
  }

  export type GroupClubCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | GroupClubCountOutputTypeCountUsersArgs
    board?: boolean | GroupClubCountOutputTypeCountBoardArgs
    challenge?: boolean | GroupClubCountOutputTypeCountChallengeArgs
  }

  // Custom InputTypes
  /**
   * GroupClubCountOutputType without action
   */
  export type GroupClubCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupClubCountOutputType
     */
    select?: GroupClubCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GroupClubCountOutputType without action
   */
  export type GroupClubCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * GroupClubCountOutputType without action
   */
  export type GroupClubCountOutputTypeCountBoardArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * GroupClubCountOutputType without action
   */
  export type GroupClubCountOutputTypeCountChallengeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChallengeWhereInput
  }


  /**
   * Count Type GroupInteCountOutputType
   */

  export type GroupInteCountOutputType = {
    usersInte: number
    challengeSucceed: number
  }

  export type GroupInteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usersInte?: boolean | GroupInteCountOutputTypeCountUsersInteArgs
    challengeSucceed?: boolean | GroupInteCountOutputTypeCountChallengeSucceedArgs
  }

  // Custom InputTypes
  /**
   * GroupInteCountOutputType without action
   */
  export type GroupInteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupInteCountOutputType
     */
    select?: GroupInteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GroupInteCountOutputType without action
   */
  export type GroupInteCountOutputTypeCountUsersInteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * GroupInteCountOutputType without action
   */
  export type GroupInteCountOutputTypeCountChallengeSucceedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChallengeWhereInput
  }


  /**
   * Count Type ChallengeCountOutputType
   */

  export type ChallengeCountOutputType = {
    groupInteSucceed: number
    proofs: number
  }

  export type ChallengeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    groupInteSucceed?: boolean | ChallengeCountOutputTypeCountGroupInteSucceedArgs
    proofs?: boolean | ChallengeCountOutputTypeCountProofsArgs
  }

  // Custom InputTypes
  /**
   * ChallengeCountOutputType without action
   */
  export type ChallengeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeCountOutputType
     */
    select?: ChallengeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChallengeCountOutputType without action
   */
  export type ChallengeCountOutputTypeCountGroupInteSucceedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupInteWhereInput
  }

  /**
   * ChallengeCountOutputType without action
   */
  export type ChallengeCountOutputTypeCountProofsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProofWhereInput
  }


  /**
   * Count Type LocationCountOutputType
   */

  export type LocationCountOutputType = {
    challenge: number
  }

  export type LocationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    challenge?: boolean | LocationCountOutputTypeCountChallengeArgs
  }

  // Custom InputTypes
  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCountOutputType
     */
    select?: LocationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountChallengeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChallengeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    points: number | null
  }

  export type UserSumAggregateOutputType = {
    points: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    is1A: boolean | null
    profilePictureURL: string | null
    groupInteId: string | null
    points: number | null
    isAdmin: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    is1A: boolean | null
    profilePictureURL: string | null
    groupInteId: string | null
    points: number | null
    isAdmin: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    is1A: number
    profilePictureURL: number
    groupInteId: number
    points: number
    isAdmin: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    points?: true
  }

  export type UserSumAggregateInputType = {
    points?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    is1A?: true
    profilePictureURL?: true
    groupInteId?: true
    points?: true
    isAdmin?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    is1A?: true
    profilePictureURL?: true
    groupInteId?: true
    points?: true
    isAdmin?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    is1A?: true
    profilePictureURL?: true
    groupInteId?: true
    points?: true
    isAdmin?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    is1A: boolean
    profilePictureURL: string | null
    groupInteId: string | null
    points: number
    isAdmin: boolean
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    is1A?: boolean
    profilePictureURL?: boolean
    groupInteId?: boolean
    points?: boolean
    isAdmin?: boolean
    group?: boolean | User$groupArgs<ExtArgs>
    groupBoard?: boolean | User$groupBoardArgs<ExtArgs>
    groupInte?: boolean | User$groupInteArgs<ExtArgs>
    proof?: boolean | User$proofArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    is1A?: boolean
    profilePictureURL?: boolean
    groupInteId?: boolean
    points?: boolean
    isAdmin?: boolean
    groupInte?: boolean | User$groupInteArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    is1A?: boolean
    profilePictureURL?: boolean
    groupInteId?: boolean
    points?: boolean
    isAdmin?: boolean
    groupInte?: boolean | User$groupInteArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    is1A?: boolean
    profilePictureURL?: boolean
    groupInteId?: boolean
    points?: boolean
    isAdmin?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "is1A" | "profilePictureURL" | "groupInteId" | "points" | "isAdmin", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | User$groupArgs<ExtArgs>
    groupBoard?: boolean | User$groupBoardArgs<ExtArgs>
    groupInte?: boolean | User$groupInteArgs<ExtArgs>
    proof?: boolean | User$proofArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    groupInte?: boolean | User$groupInteArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    groupInte?: boolean | User$groupInteArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      group: Prisma.$GroupClubPayload<ExtArgs>[]
      groupBoard: Prisma.$GroupClubPayload<ExtArgs>[]
      groupInte: Prisma.$GroupIntePayload<ExtArgs> | null
      proof: Prisma.$ProofPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      is1A: boolean
      profilePictureURL: string | null
      groupInteId: string | null
      points: number
      isAdmin: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    group<T extends User$groupArgs<ExtArgs> = {}>(args?: Subset<T, User$groupArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupClubPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    groupBoard<T extends User$groupBoardArgs<ExtArgs> = {}>(args?: Subset<T, User$groupBoardArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupClubPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    groupInte<T extends User$groupInteArgs<ExtArgs> = {}>(args?: Subset<T, User$groupInteArgs<ExtArgs>>): Prisma__GroupInteClient<$Result.GetResult<Prisma.$GroupIntePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    proof<T extends User$proofArgs<ExtArgs> = {}>(args?: Subset<T, User$proofArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProofPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly is1A: FieldRef<"User", 'Boolean'>
    readonly profilePictureURL: FieldRef<"User", 'String'>
    readonly groupInteId: FieldRef<"User", 'String'>
    readonly points: FieldRef<"User", 'Int'>
    readonly isAdmin: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.group
   */
  export type User$groupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupClub
     */
    select?: GroupClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupClub
     */
    omit?: GroupClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupClubInclude<ExtArgs> | null
    where?: GroupClubWhereInput
    orderBy?: GroupClubOrderByWithRelationInput | GroupClubOrderByWithRelationInput[]
    cursor?: GroupClubWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupClubScalarFieldEnum | GroupClubScalarFieldEnum[]
  }

  /**
   * User.groupBoard
   */
  export type User$groupBoardArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupClub
     */
    select?: GroupClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupClub
     */
    omit?: GroupClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupClubInclude<ExtArgs> | null
    where?: GroupClubWhereInput
    orderBy?: GroupClubOrderByWithRelationInput | GroupClubOrderByWithRelationInput[]
    cursor?: GroupClubWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupClubScalarFieldEnum | GroupClubScalarFieldEnum[]
  }

  /**
   * User.groupInte
   */
  export type User$groupInteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupInte
     */
    select?: GroupInteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupInte
     */
    omit?: GroupInteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInteInclude<ExtArgs> | null
    where?: GroupInteWhereInput
  }

  /**
   * User.proof
   */
  export type User$proofArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proof
     */
    select?: ProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proof
     */
    omit?: ProofOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofInclude<ExtArgs> | null
    where?: ProofWhereInput
    orderBy?: ProofOrderByWithRelationInput | ProofOrderByWithRelationInput[]
    cursor?: ProofWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProofScalarFieldEnum | ProofScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model GroupClub
   */

  export type AggregateGroupClub = {
    _count: GroupClubCountAggregateOutputType | null
    _min: GroupClubMinAggregateOutputType | null
    _max: GroupClubMaxAggregateOutputType | null
  }

  export type GroupClubMinAggregateOutputType = {
    groupId: string | null
    name: string | null
    pictureURL: string | null
  }

  export type GroupClubMaxAggregateOutputType = {
    groupId: string | null
    name: string | null
    pictureURL: string | null
  }

  export type GroupClubCountAggregateOutputType = {
    groupId: number
    name: number
    pictureURL: number
    _all: number
  }


  export type GroupClubMinAggregateInputType = {
    groupId?: true
    name?: true
    pictureURL?: true
  }

  export type GroupClubMaxAggregateInputType = {
    groupId?: true
    name?: true
    pictureURL?: true
  }

  export type GroupClubCountAggregateInputType = {
    groupId?: true
    name?: true
    pictureURL?: true
    _all?: true
  }

  export type GroupClubAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupClub to aggregate.
     */
    where?: GroupClubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupClubs to fetch.
     */
    orderBy?: GroupClubOrderByWithRelationInput | GroupClubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupClubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupClubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupClubs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GroupClubs
    **/
    _count?: true | GroupClubCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupClubMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupClubMaxAggregateInputType
  }

  export type GetGroupClubAggregateType<T extends GroupClubAggregateArgs> = {
        [P in keyof T & keyof AggregateGroupClub]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroupClub[P]>
      : GetScalarType<T[P], AggregateGroupClub[P]>
  }




  export type GroupClubGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupClubWhereInput
    orderBy?: GroupClubOrderByWithAggregationInput | GroupClubOrderByWithAggregationInput[]
    by: GroupClubScalarFieldEnum[] | GroupClubScalarFieldEnum
    having?: GroupClubScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupClubCountAggregateInputType | true
    _min?: GroupClubMinAggregateInputType
    _max?: GroupClubMaxAggregateInputType
  }

  export type GroupClubGroupByOutputType = {
    groupId: string
    name: string
    pictureURL: string | null
    _count: GroupClubCountAggregateOutputType | null
    _min: GroupClubMinAggregateOutputType | null
    _max: GroupClubMaxAggregateOutputType | null
  }

  type GetGroupClubGroupByPayload<T extends GroupClubGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupClubGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupClubGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupClubGroupByOutputType[P]>
            : GetScalarType<T[P], GroupClubGroupByOutputType[P]>
        }
      >
    >


  export type GroupClubSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    groupId?: boolean
    name?: boolean
    pictureURL?: boolean
    users?: boolean | GroupClub$usersArgs<ExtArgs>
    board?: boolean | GroupClub$boardArgs<ExtArgs>
    challenge?: boolean | GroupClub$challengeArgs<ExtArgs>
    _count?: boolean | GroupClubCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupClub"]>

  export type GroupClubSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    groupId?: boolean
    name?: boolean
    pictureURL?: boolean
  }, ExtArgs["result"]["groupClub"]>

  export type GroupClubSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    groupId?: boolean
    name?: boolean
    pictureURL?: boolean
  }, ExtArgs["result"]["groupClub"]>

  export type GroupClubSelectScalar = {
    groupId?: boolean
    name?: boolean
    pictureURL?: boolean
  }

  export type GroupClubOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"groupId" | "name" | "pictureURL", ExtArgs["result"]["groupClub"]>
  export type GroupClubInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | GroupClub$usersArgs<ExtArgs>
    board?: boolean | GroupClub$boardArgs<ExtArgs>
    challenge?: boolean | GroupClub$challengeArgs<ExtArgs>
    _count?: boolean | GroupClubCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GroupClubIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GroupClubIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GroupClubPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GroupClub"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      board: Prisma.$UserPayload<ExtArgs>[]
      challenge: Prisma.$ChallengePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      groupId: string
      name: string
      pictureURL: string | null
    }, ExtArgs["result"]["groupClub"]>
    composites: {}
  }

  type GroupClubGetPayload<S extends boolean | null | undefined | GroupClubDefaultArgs> = $Result.GetResult<Prisma.$GroupClubPayload, S>

  type GroupClubCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupClubFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupClubCountAggregateInputType | true
    }

  export interface GroupClubDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GroupClub'], meta: { name: 'GroupClub' } }
    /**
     * Find zero or one GroupClub that matches the filter.
     * @param {GroupClubFindUniqueArgs} args - Arguments to find a GroupClub
     * @example
     * // Get one GroupClub
     * const groupClub = await prisma.groupClub.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupClubFindUniqueArgs>(args: SelectSubset<T, GroupClubFindUniqueArgs<ExtArgs>>): Prisma__GroupClubClient<$Result.GetResult<Prisma.$GroupClubPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GroupClub that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupClubFindUniqueOrThrowArgs} args - Arguments to find a GroupClub
     * @example
     * // Get one GroupClub
     * const groupClub = await prisma.groupClub.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupClubFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupClubFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupClubClient<$Result.GetResult<Prisma.$GroupClubPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupClub that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupClubFindFirstArgs} args - Arguments to find a GroupClub
     * @example
     * // Get one GroupClub
     * const groupClub = await prisma.groupClub.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupClubFindFirstArgs>(args?: SelectSubset<T, GroupClubFindFirstArgs<ExtArgs>>): Prisma__GroupClubClient<$Result.GetResult<Prisma.$GroupClubPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupClub that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupClubFindFirstOrThrowArgs} args - Arguments to find a GroupClub
     * @example
     * // Get one GroupClub
     * const groupClub = await prisma.groupClub.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupClubFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupClubFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupClubClient<$Result.GetResult<Prisma.$GroupClubPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GroupClubs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupClubFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GroupClubs
     * const groupClubs = await prisma.groupClub.findMany()
     * 
     * // Get first 10 GroupClubs
     * const groupClubs = await prisma.groupClub.findMany({ take: 10 })
     * 
     * // Only select the `groupId`
     * const groupClubWithGroupIdOnly = await prisma.groupClub.findMany({ select: { groupId: true } })
     * 
     */
    findMany<T extends GroupClubFindManyArgs>(args?: SelectSubset<T, GroupClubFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupClubPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GroupClub.
     * @param {GroupClubCreateArgs} args - Arguments to create a GroupClub.
     * @example
     * // Create one GroupClub
     * const GroupClub = await prisma.groupClub.create({
     *   data: {
     *     // ... data to create a GroupClub
     *   }
     * })
     * 
     */
    create<T extends GroupClubCreateArgs>(args: SelectSubset<T, GroupClubCreateArgs<ExtArgs>>): Prisma__GroupClubClient<$Result.GetResult<Prisma.$GroupClubPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GroupClubs.
     * @param {GroupClubCreateManyArgs} args - Arguments to create many GroupClubs.
     * @example
     * // Create many GroupClubs
     * const groupClub = await prisma.groupClub.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupClubCreateManyArgs>(args?: SelectSubset<T, GroupClubCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GroupClubs and returns the data saved in the database.
     * @param {GroupClubCreateManyAndReturnArgs} args - Arguments to create many GroupClubs.
     * @example
     * // Create many GroupClubs
     * const groupClub = await prisma.groupClub.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GroupClubs and only return the `groupId`
     * const groupClubWithGroupIdOnly = await prisma.groupClub.createManyAndReturn({
     *   select: { groupId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupClubCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupClubCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupClubPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GroupClub.
     * @param {GroupClubDeleteArgs} args - Arguments to delete one GroupClub.
     * @example
     * // Delete one GroupClub
     * const GroupClub = await prisma.groupClub.delete({
     *   where: {
     *     // ... filter to delete one GroupClub
     *   }
     * })
     * 
     */
    delete<T extends GroupClubDeleteArgs>(args: SelectSubset<T, GroupClubDeleteArgs<ExtArgs>>): Prisma__GroupClubClient<$Result.GetResult<Prisma.$GroupClubPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GroupClub.
     * @param {GroupClubUpdateArgs} args - Arguments to update one GroupClub.
     * @example
     * // Update one GroupClub
     * const groupClub = await prisma.groupClub.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupClubUpdateArgs>(args: SelectSubset<T, GroupClubUpdateArgs<ExtArgs>>): Prisma__GroupClubClient<$Result.GetResult<Prisma.$GroupClubPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GroupClubs.
     * @param {GroupClubDeleteManyArgs} args - Arguments to filter GroupClubs to delete.
     * @example
     * // Delete a few GroupClubs
     * const { count } = await prisma.groupClub.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupClubDeleteManyArgs>(args?: SelectSubset<T, GroupClubDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupClubs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupClubUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GroupClubs
     * const groupClub = await prisma.groupClub.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupClubUpdateManyArgs>(args: SelectSubset<T, GroupClubUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupClubs and returns the data updated in the database.
     * @param {GroupClubUpdateManyAndReturnArgs} args - Arguments to update many GroupClubs.
     * @example
     * // Update many GroupClubs
     * const groupClub = await prisma.groupClub.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GroupClubs and only return the `groupId`
     * const groupClubWithGroupIdOnly = await prisma.groupClub.updateManyAndReturn({
     *   select: { groupId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GroupClubUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupClubUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupClubPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GroupClub.
     * @param {GroupClubUpsertArgs} args - Arguments to update or create a GroupClub.
     * @example
     * // Update or create a GroupClub
     * const groupClub = await prisma.groupClub.upsert({
     *   create: {
     *     // ... data to create a GroupClub
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GroupClub we want to update
     *   }
     * })
     */
    upsert<T extends GroupClubUpsertArgs>(args: SelectSubset<T, GroupClubUpsertArgs<ExtArgs>>): Prisma__GroupClubClient<$Result.GetResult<Prisma.$GroupClubPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GroupClubs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupClubCountArgs} args - Arguments to filter GroupClubs to count.
     * @example
     * // Count the number of GroupClubs
     * const count = await prisma.groupClub.count({
     *   where: {
     *     // ... the filter for the GroupClubs we want to count
     *   }
     * })
    **/
    count<T extends GroupClubCountArgs>(
      args?: Subset<T, GroupClubCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupClubCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GroupClub.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupClubAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GroupClubAggregateArgs>(args: Subset<T, GroupClubAggregateArgs>): Prisma.PrismaPromise<GetGroupClubAggregateType<T>>

    /**
     * Group by GroupClub.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupClubGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GroupClubGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupClubGroupByArgs['orderBy'] }
        : { orderBy?: GroupClubGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupClubGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupClubGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GroupClub model
   */
  readonly fields: GroupClubFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GroupClub.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupClubClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends GroupClub$usersArgs<ExtArgs> = {}>(args?: Subset<T, GroupClub$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    board<T extends GroupClub$boardArgs<ExtArgs> = {}>(args?: Subset<T, GroupClub$boardArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    challenge<T extends GroupClub$challengeArgs<ExtArgs> = {}>(args?: Subset<T, GroupClub$challengeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GroupClub model
   */
  interface GroupClubFieldRefs {
    readonly groupId: FieldRef<"GroupClub", 'String'>
    readonly name: FieldRef<"GroupClub", 'String'>
    readonly pictureURL: FieldRef<"GroupClub", 'String'>
  }
    

  // Custom InputTypes
  /**
   * GroupClub findUnique
   */
  export type GroupClubFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupClub
     */
    select?: GroupClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupClub
     */
    omit?: GroupClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupClubInclude<ExtArgs> | null
    /**
     * Filter, which GroupClub to fetch.
     */
    where: GroupClubWhereUniqueInput
  }

  /**
   * GroupClub findUniqueOrThrow
   */
  export type GroupClubFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupClub
     */
    select?: GroupClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupClub
     */
    omit?: GroupClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupClubInclude<ExtArgs> | null
    /**
     * Filter, which GroupClub to fetch.
     */
    where: GroupClubWhereUniqueInput
  }

  /**
   * GroupClub findFirst
   */
  export type GroupClubFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupClub
     */
    select?: GroupClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupClub
     */
    omit?: GroupClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupClubInclude<ExtArgs> | null
    /**
     * Filter, which GroupClub to fetch.
     */
    where?: GroupClubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupClubs to fetch.
     */
    orderBy?: GroupClubOrderByWithRelationInput | GroupClubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupClubs.
     */
    cursor?: GroupClubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupClubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupClubs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupClubs.
     */
    distinct?: GroupClubScalarFieldEnum | GroupClubScalarFieldEnum[]
  }

  /**
   * GroupClub findFirstOrThrow
   */
  export type GroupClubFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupClub
     */
    select?: GroupClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupClub
     */
    omit?: GroupClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupClubInclude<ExtArgs> | null
    /**
     * Filter, which GroupClub to fetch.
     */
    where?: GroupClubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupClubs to fetch.
     */
    orderBy?: GroupClubOrderByWithRelationInput | GroupClubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupClubs.
     */
    cursor?: GroupClubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupClubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupClubs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupClubs.
     */
    distinct?: GroupClubScalarFieldEnum | GroupClubScalarFieldEnum[]
  }

  /**
   * GroupClub findMany
   */
  export type GroupClubFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupClub
     */
    select?: GroupClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupClub
     */
    omit?: GroupClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupClubInclude<ExtArgs> | null
    /**
     * Filter, which GroupClubs to fetch.
     */
    where?: GroupClubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupClubs to fetch.
     */
    orderBy?: GroupClubOrderByWithRelationInput | GroupClubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GroupClubs.
     */
    cursor?: GroupClubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupClubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupClubs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupClubs.
     */
    distinct?: GroupClubScalarFieldEnum | GroupClubScalarFieldEnum[]
  }

  /**
   * GroupClub create
   */
  export type GroupClubCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupClub
     */
    select?: GroupClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupClub
     */
    omit?: GroupClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupClubInclude<ExtArgs> | null
    /**
     * The data needed to create a GroupClub.
     */
    data: XOR<GroupClubCreateInput, GroupClubUncheckedCreateInput>
  }

  /**
   * GroupClub createMany
   */
  export type GroupClubCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GroupClubs.
     */
    data: GroupClubCreateManyInput | GroupClubCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GroupClub createManyAndReturn
   */
  export type GroupClubCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupClub
     */
    select?: GroupClubSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupClub
     */
    omit?: GroupClubOmit<ExtArgs> | null
    /**
     * The data used to create many GroupClubs.
     */
    data: GroupClubCreateManyInput | GroupClubCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GroupClub update
   */
  export type GroupClubUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupClub
     */
    select?: GroupClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupClub
     */
    omit?: GroupClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupClubInclude<ExtArgs> | null
    /**
     * The data needed to update a GroupClub.
     */
    data: XOR<GroupClubUpdateInput, GroupClubUncheckedUpdateInput>
    /**
     * Choose, which GroupClub to update.
     */
    where: GroupClubWhereUniqueInput
  }

  /**
   * GroupClub updateMany
   */
  export type GroupClubUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GroupClubs.
     */
    data: XOR<GroupClubUpdateManyMutationInput, GroupClubUncheckedUpdateManyInput>
    /**
     * Filter which GroupClubs to update
     */
    where?: GroupClubWhereInput
    /**
     * Limit how many GroupClubs to update.
     */
    limit?: number
  }

  /**
   * GroupClub updateManyAndReturn
   */
  export type GroupClubUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupClub
     */
    select?: GroupClubSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupClub
     */
    omit?: GroupClubOmit<ExtArgs> | null
    /**
     * The data used to update GroupClubs.
     */
    data: XOR<GroupClubUpdateManyMutationInput, GroupClubUncheckedUpdateManyInput>
    /**
     * Filter which GroupClubs to update
     */
    where?: GroupClubWhereInput
    /**
     * Limit how many GroupClubs to update.
     */
    limit?: number
  }

  /**
   * GroupClub upsert
   */
  export type GroupClubUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupClub
     */
    select?: GroupClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupClub
     */
    omit?: GroupClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupClubInclude<ExtArgs> | null
    /**
     * The filter to search for the GroupClub to update in case it exists.
     */
    where: GroupClubWhereUniqueInput
    /**
     * In case the GroupClub found by the `where` argument doesn't exist, create a new GroupClub with this data.
     */
    create: XOR<GroupClubCreateInput, GroupClubUncheckedCreateInput>
    /**
     * In case the GroupClub was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupClubUpdateInput, GroupClubUncheckedUpdateInput>
  }

  /**
   * GroupClub delete
   */
  export type GroupClubDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupClub
     */
    select?: GroupClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupClub
     */
    omit?: GroupClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupClubInclude<ExtArgs> | null
    /**
     * Filter which GroupClub to delete.
     */
    where: GroupClubWhereUniqueInput
  }

  /**
   * GroupClub deleteMany
   */
  export type GroupClubDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupClubs to delete
     */
    where?: GroupClubWhereInput
    /**
     * Limit how many GroupClubs to delete.
     */
    limit?: number
  }

  /**
   * GroupClub.users
   */
  export type GroupClub$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * GroupClub.board
   */
  export type GroupClub$boardArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * GroupClub.challenge
   */
  export type GroupClub$challengeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    where?: ChallengeWhereInput
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    cursor?: ChallengeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChallengeScalarFieldEnum | ChallengeScalarFieldEnum[]
  }

  /**
   * GroupClub without action
   */
  export type GroupClubDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupClub
     */
    select?: GroupClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupClub
     */
    omit?: GroupClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupClubInclude<ExtArgs> | null
  }


  /**
   * Model GroupInte
   */

  export type AggregateGroupInte = {
    _count: GroupInteCountAggregateOutputType | null
    _avg: GroupInteAvgAggregateOutputType | null
    _sum: GroupInteSumAggregateOutputType | null
    _min: GroupInteMinAggregateOutputType | null
    _max: GroupInteMaxAggregateOutputType | null
  }

  export type GroupInteAvgAggregateOutputType = {
    points: number | null
  }

  export type GroupInteSumAggregateOutputType = {
    points: number | null
  }

  export type GroupInteMinAggregateOutputType = {
    groupId: string | null
    name: string | null
    pictureURL: string | null
    points: number | null
  }

  export type GroupInteMaxAggregateOutputType = {
    groupId: string | null
    name: string | null
    pictureURL: string | null
    points: number | null
  }

  export type GroupInteCountAggregateOutputType = {
    groupId: number
    name: number
    pictureURL: number
    points: number
    _all: number
  }


  export type GroupInteAvgAggregateInputType = {
    points?: true
  }

  export type GroupInteSumAggregateInputType = {
    points?: true
  }

  export type GroupInteMinAggregateInputType = {
    groupId?: true
    name?: true
    pictureURL?: true
    points?: true
  }

  export type GroupInteMaxAggregateInputType = {
    groupId?: true
    name?: true
    pictureURL?: true
    points?: true
  }

  export type GroupInteCountAggregateInputType = {
    groupId?: true
    name?: true
    pictureURL?: true
    points?: true
    _all?: true
  }

  export type GroupInteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupInte to aggregate.
     */
    where?: GroupInteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupIntes to fetch.
     */
    orderBy?: GroupInteOrderByWithRelationInput | GroupInteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupInteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupIntes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupIntes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GroupIntes
    **/
    _count?: true | GroupInteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GroupInteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GroupInteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupInteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupInteMaxAggregateInputType
  }

  export type GetGroupInteAggregateType<T extends GroupInteAggregateArgs> = {
        [P in keyof T & keyof AggregateGroupInte]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroupInte[P]>
      : GetScalarType<T[P], AggregateGroupInte[P]>
  }




  export type GroupInteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupInteWhereInput
    orderBy?: GroupInteOrderByWithAggregationInput | GroupInteOrderByWithAggregationInput[]
    by: GroupInteScalarFieldEnum[] | GroupInteScalarFieldEnum
    having?: GroupInteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupInteCountAggregateInputType | true
    _avg?: GroupInteAvgAggregateInputType
    _sum?: GroupInteSumAggregateInputType
    _min?: GroupInteMinAggregateInputType
    _max?: GroupInteMaxAggregateInputType
  }

  export type GroupInteGroupByOutputType = {
    groupId: string
    name: string
    pictureURL: string | null
    points: number
    _count: GroupInteCountAggregateOutputType | null
    _avg: GroupInteAvgAggregateOutputType | null
    _sum: GroupInteSumAggregateOutputType | null
    _min: GroupInteMinAggregateOutputType | null
    _max: GroupInteMaxAggregateOutputType | null
  }

  type GetGroupInteGroupByPayload<T extends GroupInteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupInteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupInteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupInteGroupByOutputType[P]>
            : GetScalarType<T[P], GroupInteGroupByOutputType[P]>
        }
      >
    >


  export type GroupInteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    groupId?: boolean
    name?: boolean
    pictureURL?: boolean
    points?: boolean
    usersInte?: boolean | GroupInte$usersInteArgs<ExtArgs>
    challengeSucceed?: boolean | GroupInte$challengeSucceedArgs<ExtArgs>
    _count?: boolean | GroupInteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupInte"]>

  export type GroupInteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    groupId?: boolean
    name?: boolean
    pictureURL?: boolean
    points?: boolean
  }, ExtArgs["result"]["groupInte"]>

  export type GroupInteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    groupId?: boolean
    name?: boolean
    pictureURL?: boolean
    points?: boolean
  }, ExtArgs["result"]["groupInte"]>

  export type GroupInteSelectScalar = {
    groupId?: boolean
    name?: boolean
    pictureURL?: boolean
    points?: boolean
  }

  export type GroupInteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"groupId" | "name" | "pictureURL" | "points", ExtArgs["result"]["groupInte"]>
  export type GroupInteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usersInte?: boolean | GroupInte$usersInteArgs<ExtArgs>
    challengeSucceed?: boolean | GroupInte$challengeSucceedArgs<ExtArgs>
    _count?: boolean | GroupInteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GroupInteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GroupInteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GroupIntePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GroupInte"
    objects: {
      usersInte: Prisma.$UserPayload<ExtArgs>[]
      challengeSucceed: Prisma.$ChallengePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      groupId: string
      name: string
      pictureURL: string | null
      points: number
    }, ExtArgs["result"]["groupInte"]>
    composites: {}
  }

  type GroupInteGetPayload<S extends boolean | null | undefined | GroupInteDefaultArgs> = $Result.GetResult<Prisma.$GroupIntePayload, S>

  type GroupInteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupInteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupInteCountAggregateInputType | true
    }

  export interface GroupInteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GroupInte'], meta: { name: 'GroupInte' } }
    /**
     * Find zero or one GroupInte that matches the filter.
     * @param {GroupInteFindUniqueArgs} args - Arguments to find a GroupInte
     * @example
     * // Get one GroupInte
     * const groupInte = await prisma.groupInte.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupInteFindUniqueArgs>(args: SelectSubset<T, GroupInteFindUniqueArgs<ExtArgs>>): Prisma__GroupInteClient<$Result.GetResult<Prisma.$GroupIntePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GroupInte that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupInteFindUniqueOrThrowArgs} args - Arguments to find a GroupInte
     * @example
     * // Get one GroupInte
     * const groupInte = await prisma.groupInte.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupInteFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupInteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupInteClient<$Result.GetResult<Prisma.$GroupIntePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupInte that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupInteFindFirstArgs} args - Arguments to find a GroupInte
     * @example
     * // Get one GroupInte
     * const groupInte = await prisma.groupInte.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupInteFindFirstArgs>(args?: SelectSubset<T, GroupInteFindFirstArgs<ExtArgs>>): Prisma__GroupInteClient<$Result.GetResult<Prisma.$GroupIntePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupInte that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupInteFindFirstOrThrowArgs} args - Arguments to find a GroupInte
     * @example
     * // Get one GroupInte
     * const groupInte = await prisma.groupInte.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupInteFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupInteFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupInteClient<$Result.GetResult<Prisma.$GroupIntePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GroupIntes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupInteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GroupIntes
     * const groupIntes = await prisma.groupInte.findMany()
     * 
     * // Get first 10 GroupIntes
     * const groupIntes = await prisma.groupInte.findMany({ take: 10 })
     * 
     * // Only select the `groupId`
     * const groupInteWithGroupIdOnly = await prisma.groupInte.findMany({ select: { groupId: true } })
     * 
     */
    findMany<T extends GroupInteFindManyArgs>(args?: SelectSubset<T, GroupInteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupIntePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GroupInte.
     * @param {GroupInteCreateArgs} args - Arguments to create a GroupInte.
     * @example
     * // Create one GroupInte
     * const GroupInte = await prisma.groupInte.create({
     *   data: {
     *     // ... data to create a GroupInte
     *   }
     * })
     * 
     */
    create<T extends GroupInteCreateArgs>(args: SelectSubset<T, GroupInteCreateArgs<ExtArgs>>): Prisma__GroupInteClient<$Result.GetResult<Prisma.$GroupIntePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GroupIntes.
     * @param {GroupInteCreateManyArgs} args - Arguments to create many GroupIntes.
     * @example
     * // Create many GroupIntes
     * const groupInte = await prisma.groupInte.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupInteCreateManyArgs>(args?: SelectSubset<T, GroupInteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GroupIntes and returns the data saved in the database.
     * @param {GroupInteCreateManyAndReturnArgs} args - Arguments to create many GroupIntes.
     * @example
     * // Create many GroupIntes
     * const groupInte = await prisma.groupInte.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GroupIntes and only return the `groupId`
     * const groupInteWithGroupIdOnly = await prisma.groupInte.createManyAndReturn({
     *   select: { groupId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupInteCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupInteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupIntePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GroupInte.
     * @param {GroupInteDeleteArgs} args - Arguments to delete one GroupInte.
     * @example
     * // Delete one GroupInte
     * const GroupInte = await prisma.groupInte.delete({
     *   where: {
     *     // ... filter to delete one GroupInte
     *   }
     * })
     * 
     */
    delete<T extends GroupInteDeleteArgs>(args: SelectSubset<T, GroupInteDeleteArgs<ExtArgs>>): Prisma__GroupInteClient<$Result.GetResult<Prisma.$GroupIntePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GroupInte.
     * @param {GroupInteUpdateArgs} args - Arguments to update one GroupInte.
     * @example
     * // Update one GroupInte
     * const groupInte = await prisma.groupInte.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupInteUpdateArgs>(args: SelectSubset<T, GroupInteUpdateArgs<ExtArgs>>): Prisma__GroupInteClient<$Result.GetResult<Prisma.$GroupIntePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GroupIntes.
     * @param {GroupInteDeleteManyArgs} args - Arguments to filter GroupIntes to delete.
     * @example
     * // Delete a few GroupIntes
     * const { count } = await prisma.groupInte.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupInteDeleteManyArgs>(args?: SelectSubset<T, GroupInteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupIntes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupInteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GroupIntes
     * const groupInte = await prisma.groupInte.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupInteUpdateManyArgs>(args: SelectSubset<T, GroupInteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupIntes and returns the data updated in the database.
     * @param {GroupInteUpdateManyAndReturnArgs} args - Arguments to update many GroupIntes.
     * @example
     * // Update many GroupIntes
     * const groupInte = await prisma.groupInte.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GroupIntes and only return the `groupId`
     * const groupInteWithGroupIdOnly = await prisma.groupInte.updateManyAndReturn({
     *   select: { groupId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GroupInteUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupInteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupIntePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GroupInte.
     * @param {GroupInteUpsertArgs} args - Arguments to update or create a GroupInte.
     * @example
     * // Update or create a GroupInte
     * const groupInte = await prisma.groupInte.upsert({
     *   create: {
     *     // ... data to create a GroupInte
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GroupInte we want to update
     *   }
     * })
     */
    upsert<T extends GroupInteUpsertArgs>(args: SelectSubset<T, GroupInteUpsertArgs<ExtArgs>>): Prisma__GroupInteClient<$Result.GetResult<Prisma.$GroupIntePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GroupIntes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupInteCountArgs} args - Arguments to filter GroupIntes to count.
     * @example
     * // Count the number of GroupIntes
     * const count = await prisma.groupInte.count({
     *   where: {
     *     // ... the filter for the GroupIntes we want to count
     *   }
     * })
    **/
    count<T extends GroupInteCountArgs>(
      args?: Subset<T, GroupInteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupInteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GroupInte.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupInteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GroupInteAggregateArgs>(args: Subset<T, GroupInteAggregateArgs>): Prisma.PrismaPromise<GetGroupInteAggregateType<T>>

    /**
     * Group by GroupInte.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupInteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GroupInteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupInteGroupByArgs['orderBy'] }
        : { orderBy?: GroupInteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupInteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupInteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GroupInte model
   */
  readonly fields: GroupInteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GroupInte.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupInteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usersInte<T extends GroupInte$usersInteArgs<ExtArgs> = {}>(args?: Subset<T, GroupInte$usersInteArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    challengeSucceed<T extends GroupInte$challengeSucceedArgs<ExtArgs> = {}>(args?: Subset<T, GroupInte$challengeSucceedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GroupInte model
   */
  interface GroupInteFieldRefs {
    readonly groupId: FieldRef<"GroupInte", 'String'>
    readonly name: FieldRef<"GroupInte", 'String'>
    readonly pictureURL: FieldRef<"GroupInte", 'String'>
    readonly points: FieldRef<"GroupInte", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * GroupInte findUnique
   */
  export type GroupInteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupInte
     */
    select?: GroupInteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupInte
     */
    omit?: GroupInteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInteInclude<ExtArgs> | null
    /**
     * Filter, which GroupInte to fetch.
     */
    where: GroupInteWhereUniqueInput
  }

  /**
   * GroupInte findUniqueOrThrow
   */
  export type GroupInteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupInte
     */
    select?: GroupInteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupInte
     */
    omit?: GroupInteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInteInclude<ExtArgs> | null
    /**
     * Filter, which GroupInte to fetch.
     */
    where: GroupInteWhereUniqueInput
  }

  /**
   * GroupInte findFirst
   */
  export type GroupInteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupInte
     */
    select?: GroupInteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupInte
     */
    omit?: GroupInteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInteInclude<ExtArgs> | null
    /**
     * Filter, which GroupInte to fetch.
     */
    where?: GroupInteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupIntes to fetch.
     */
    orderBy?: GroupInteOrderByWithRelationInput | GroupInteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupIntes.
     */
    cursor?: GroupInteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupIntes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupIntes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupIntes.
     */
    distinct?: GroupInteScalarFieldEnum | GroupInteScalarFieldEnum[]
  }

  /**
   * GroupInte findFirstOrThrow
   */
  export type GroupInteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupInte
     */
    select?: GroupInteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupInte
     */
    omit?: GroupInteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInteInclude<ExtArgs> | null
    /**
     * Filter, which GroupInte to fetch.
     */
    where?: GroupInteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupIntes to fetch.
     */
    orderBy?: GroupInteOrderByWithRelationInput | GroupInteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupIntes.
     */
    cursor?: GroupInteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupIntes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupIntes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupIntes.
     */
    distinct?: GroupInteScalarFieldEnum | GroupInteScalarFieldEnum[]
  }

  /**
   * GroupInte findMany
   */
  export type GroupInteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupInte
     */
    select?: GroupInteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupInte
     */
    omit?: GroupInteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInteInclude<ExtArgs> | null
    /**
     * Filter, which GroupIntes to fetch.
     */
    where?: GroupInteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupIntes to fetch.
     */
    orderBy?: GroupInteOrderByWithRelationInput | GroupInteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GroupIntes.
     */
    cursor?: GroupInteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupIntes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupIntes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupIntes.
     */
    distinct?: GroupInteScalarFieldEnum | GroupInteScalarFieldEnum[]
  }

  /**
   * GroupInte create
   */
  export type GroupInteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupInte
     */
    select?: GroupInteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupInte
     */
    omit?: GroupInteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInteInclude<ExtArgs> | null
    /**
     * The data needed to create a GroupInte.
     */
    data: XOR<GroupInteCreateInput, GroupInteUncheckedCreateInput>
  }

  /**
   * GroupInte createMany
   */
  export type GroupInteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GroupIntes.
     */
    data: GroupInteCreateManyInput | GroupInteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GroupInte createManyAndReturn
   */
  export type GroupInteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupInte
     */
    select?: GroupInteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupInte
     */
    omit?: GroupInteOmit<ExtArgs> | null
    /**
     * The data used to create many GroupIntes.
     */
    data: GroupInteCreateManyInput | GroupInteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GroupInte update
   */
  export type GroupInteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupInte
     */
    select?: GroupInteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupInte
     */
    omit?: GroupInteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInteInclude<ExtArgs> | null
    /**
     * The data needed to update a GroupInte.
     */
    data: XOR<GroupInteUpdateInput, GroupInteUncheckedUpdateInput>
    /**
     * Choose, which GroupInte to update.
     */
    where: GroupInteWhereUniqueInput
  }

  /**
   * GroupInte updateMany
   */
  export type GroupInteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GroupIntes.
     */
    data: XOR<GroupInteUpdateManyMutationInput, GroupInteUncheckedUpdateManyInput>
    /**
     * Filter which GroupIntes to update
     */
    where?: GroupInteWhereInput
    /**
     * Limit how many GroupIntes to update.
     */
    limit?: number
  }

  /**
   * GroupInte updateManyAndReturn
   */
  export type GroupInteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupInte
     */
    select?: GroupInteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupInte
     */
    omit?: GroupInteOmit<ExtArgs> | null
    /**
     * The data used to update GroupIntes.
     */
    data: XOR<GroupInteUpdateManyMutationInput, GroupInteUncheckedUpdateManyInput>
    /**
     * Filter which GroupIntes to update
     */
    where?: GroupInteWhereInput
    /**
     * Limit how many GroupIntes to update.
     */
    limit?: number
  }

  /**
   * GroupInte upsert
   */
  export type GroupInteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupInte
     */
    select?: GroupInteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupInte
     */
    omit?: GroupInteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInteInclude<ExtArgs> | null
    /**
     * The filter to search for the GroupInte to update in case it exists.
     */
    where: GroupInteWhereUniqueInput
    /**
     * In case the GroupInte found by the `where` argument doesn't exist, create a new GroupInte with this data.
     */
    create: XOR<GroupInteCreateInput, GroupInteUncheckedCreateInput>
    /**
     * In case the GroupInte was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupInteUpdateInput, GroupInteUncheckedUpdateInput>
  }

  /**
   * GroupInte delete
   */
  export type GroupInteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupInte
     */
    select?: GroupInteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupInte
     */
    omit?: GroupInteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInteInclude<ExtArgs> | null
    /**
     * Filter which GroupInte to delete.
     */
    where: GroupInteWhereUniqueInput
  }

  /**
   * GroupInte deleteMany
   */
  export type GroupInteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupIntes to delete
     */
    where?: GroupInteWhereInput
    /**
     * Limit how many GroupIntes to delete.
     */
    limit?: number
  }

  /**
   * GroupInte.usersInte
   */
  export type GroupInte$usersInteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * GroupInte.challengeSucceed
   */
  export type GroupInte$challengeSucceedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    where?: ChallengeWhereInput
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    cursor?: ChallengeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChallengeScalarFieldEnum | ChallengeScalarFieldEnum[]
  }

  /**
   * GroupInte without action
   */
  export type GroupInteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupInte
     */
    select?: GroupInteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupInte
     */
    omit?: GroupInteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInteInclude<ExtArgs> | null
  }


  /**
   * Model Proof
   */

  export type AggregateProof = {
    _count: ProofCountAggregateOutputType | null
    _avg: ProofAvgAggregateOutputType | null
    _sum: ProofSumAggregateOutputType | null
    _min: ProofMinAggregateOutputType | null
    _max: ProofMaxAggregateOutputType | null
  }

  export type ProofAvgAggregateOutputType = {
    challengeId: number | null
  }

  export type ProofSumAggregateOutputType = {
    challengeId: number | null
  }

  export type ProofMinAggregateOutputType = {
    proofId: string | null
    userId: string | null
    content: string | null
    type: $Enums.UploadType | null
    date: Date | null
    media: string | null
    text: string | null
    challengeId: number | null
    validatorId: string | null
    status: $Enums.Status | null
  }

  export type ProofMaxAggregateOutputType = {
    proofId: string | null
    userId: string | null
    content: string | null
    type: $Enums.UploadType | null
    date: Date | null
    media: string | null
    text: string | null
    challengeId: number | null
    validatorId: string | null
    status: $Enums.Status | null
  }

  export type ProofCountAggregateOutputType = {
    proofId: number
    userId: number
    content: number
    type: number
    date: number
    media: number
    text: number
    challengeId: number
    validatorId: number
    status: number
    _all: number
  }


  export type ProofAvgAggregateInputType = {
    challengeId?: true
  }

  export type ProofSumAggregateInputType = {
    challengeId?: true
  }

  export type ProofMinAggregateInputType = {
    proofId?: true
    userId?: true
    content?: true
    type?: true
    date?: true
    media?: true
    text?: true
    challengeId?: true
    validatorId?: true
    status?: true
  }

  export type ProofMaxAggregateInputType = {
    proofId?: true
    userId?: true
    content?: true
    type?: true
    date?: true
    media?: true
    text?: true
    challengeId?: true
    validatorId?: true
    status?: true
  }

  export type ProofCountAggregateInputType = {
    proofId?: true
    userId?: true
    content?: true
    type?: true
    date?: true
    media?: true
    text?: true
    challengeId?: true
    validatorId?: true
    status?: true
    _all?: true
  }

  export type ProofAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Proof to aggregate.
     */
    where?: ProofWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proofs to fetch.
     */
    orderBy?: ProofOrderByWithRelationInput | ProofOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProofWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proofs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proofs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Proofs
    **/
    _count?: true | ProofCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProofAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProofSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProofMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProofMaxAggregateInputType
  }

  export type GetProofAggregateType<T extends ProofAggregateArgs> = {
        [P in keyof T & keyof AggregateProof]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProof[P]>
      : GetScalarType<T[P], AggregateProof[P]>
  }




  export type ProofGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProofWhereInput
    orderBy?: ProofOrderByWithAggregationInput | ProofOrderByWithAggregationInput[]
    by: ProofScalarFieldEnum[] | ProofScalarFieldEnum
    having?: ProofScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProofCountAggregateInputType | true
    _avg?: ProofAvgAggregateInputType
    _sum?: ProofSumAggregateInputType
    _min?: ProofMinAggregateInputType
    _max?: ProofMaxAggregateInputType
  }

  export type ProofGroupByOutputType = {
    proofId: string
    userId: string
    content: string
    type: $Enums.UploadType
    date: Date
    media: string | null
    text: string | null
    challengeId: number | null
    validatorId: string | null
    status: $Enums.Status
    _count: ProofCountAggregateOutputType | null
    _avg: ProofAvgAggregateOutputType | null
    _sum: ProofSumAggregateOutputType | null
    _min: ProofMinAggregateOutputType | null
    _max: ProofMaxAggregateOutputType | null
  }

  type GetProofGroupByPayload<T extends ProofGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProofGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProofGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProofGroupByOutputType[P]>
            : GetScalarType<T[P], ProofGroupByOutputType[P]>
        }
      >
    >


  export type ProofSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    proofId?: boolean
    userId?: boolean
    content?: boolean
    type?: boolean
    date?: boolean
    media?: boolean
    text?: boolean
    challengeId?: boolean
    validatorId?: boolean
    status?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    challenge?: boolean | Proof$challengeArgs<ExtArgs>
  }, ExtArgs["result"]["proof"]>

  export type ProofSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    proofId?: boolean
    userId?: boolean
    content?: boolean
    type?: boolean
    date?: boolean
    media?: boolean
    text?: boolean
    challengeId?: boolean
    validatorId?: boolean
    status?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    challenge?: boolean | Proof$challengeArgs<ExtArgs>
  }, ExtArgs["result"]["proof"]>

  export type ProofSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    proofId?: boolean
    userId?: boolean
    content?: boolean
    type?: boolean
    date?: boolean
    media?: boolean
    text?: boolean
    challengeId?: boolean
    validatorId?: boolean
    status?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    challenge?: boolean | Proof$challengeArgs<ExtArgs>
  }, ExtArgs["result"]["proof"]>

  export type ProofSelectScalar = {
    proofId?: boolean
    userId?: boolean
    content?: boolean
    type?: boolean
    date?: boolean
    media?: boolean
    text?: boolean
    challengeId?: boolean
    validatorId?: boolean
    status?: boolean
  }

  export type ProofOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"proofId" | "userId" | "content" | "type" | "date" | "media" | "text" | "challengeId" | "validatorId" | "status", ExtArgs["result"]["proof"]>
  export type ProofInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    challenge?: boolean | Proof$challengeArgs<ExtArgs>
  }
  export type ProofIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    challenge?: boolean | Proof$challengeArgs<ExtArgs>
  }
  export type ProofIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    challenge?: boolean | Proof$challengeArgs<ExtArgs>
  }

  export type $ProofPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Proof"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      challenge: Prisma.$ChallengePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      proofId: string
      userId: string
      content: string
      type: $Enums.UploadType
      date: Date
      media: string | null
      text: string | null
      challengeId: number | null
      validatorId: string | null
      status: $Enums.Status
    }, ExtArgs["result"]["proof"]>
    composites: {}
  }

  type ProofGetPayload<S extends boolean | null | undefined | ProofDefaultArgs> = $Result.GetResult<Prisma.$ProofPayload, S>

  type ProofCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProofFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProofCountAggregateInputType | true
    }

  export interface ProofDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Proof'], meta: { name: 'Proof' } }
    /**
     * Find zero or one Proof that matches the filter.
     * @param {ProofFindUniqueArgs} args - Arguments to find a Proof
     * @example
     * // Get one Proof
     * const proof = await prisma.proof.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProofFindUniqueArgs>(args: SelectSubset<T, ProofFindUniqueArgs<ExtArgs>>): Prisma__ProofClient<$Result.GetResult<Prisma.$ProofPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Proof that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProofFindUniqueOrThrowArgs} args - Arguments to find a Proof
     * @example
     * // Get one Proof
     * const proof = await prisma.proof.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProofFindUniqueOrThrowArgs>(args: SelectSubset<T, ProofFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProofClient<$Result.GetResult<Prisma.$ProofPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Proof that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofFindFirstArgs} args - Arguments to find a Proof
     * @example
     * // Get one Proof
     * const proof = await prisma.proof.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProofFindFirstArgs>(args?: SelectSubset<T, ProofFindFirstArgs<ExtArgs>>): Prisma__ProofClient<$Result.GetResult<Prisma.$ProofPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Proof that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofFindFirstOrThrowArgs} args - Arguments to find a Proof
     * @example
     * // Get one Proof
     * const proof = await prisma.proof.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProofFindFirstOrThrowArgs>(args?: SelectSubset<T, ProofFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProofClient<$Result.GetResult<Prisma.$ProofPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Proofs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Proofs
     * const proofs = await prisma.proof.findMany()
     * 
     * // Get first 10 Proofs
     * const proofs = await prisma.proof.findMany({ take: 10 })
     * 
     * // Only select the `proofId`
     * const proofWithProofIdOnly = await prisma.proof.findMany({ select: { proofId: true } })
     * 
     */
    findMany<T extends ProofFindManyArgs>(args?: SelectSubset<T, ProofFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProofPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Proof.
     * @param {ProofCreateArgs} args - Arguments to create a Proof.
     * @example
     * // Create one Proof
     * const Proof = await prisma.proof.create({
     *   data: {
     *     // ... data to create a Proof
     *   }
     * })
     * 
     */
    create<T extends ProofCreateArgs>(args: SelectSubset<T, ProofCreateArgs<ExtArgs>>): Prisma__ProofClient<$Result.GetResult<Prisma.$ProofPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Proofs.
     * @param {ProofCreateManyArgs} args - Arguments to create many Proofs.
     * @example
     * // Create many Proofs
     * const proof = await prisma.proof.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProofCreateManyArgs>(args?: SelectSubset<T, ProofCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Proofs and returns the data saved in the database.
     * @param {ProofCreateManyAndReturnArgs} args - Arguments to create many Proofs.
     * @example
     * // Create many Proofs
     * const proof = await prisma.proof.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Proofs and only return the `proofId`
     * const proofWithProofIdOnly = await prisma.proof.createManyAndReturn({
     *   select: { proofId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProofCreateManyAndReturnArgs>(args?: SelectSubset<T, ProofCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProofPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Proof.
     * @param {ProofDeleteArgs} args - Arguments to delete one Proof.
     * @example
     * // Delete one Proof
     * const Proof = await prisma.proof.delete({
     *   where: {
     *     // ... filter to delete one Proof
     *   }
     * })
     * 
     */
    delete<T extends ProofDeleteArgs>(args: SelectSubset<T, ProofDeleteArgs<ExtArgs>>): Prisma__ProofClient<$Result.GetResult<Prisma.$ProofPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Proof.
     * @param {ProofUpdateArgs} args - Arguments to update one Proof.
     * @example
     * // Update one Proof
     * const proof = await prisma.proof.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProofUpdateArgs>(args: SelectSubset<T, ProofUpdateArgs<ExtArgs>>): Prisma__ProofClient<$Result.GetResult<Prisma.$ProofPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Proofs.
     * @param {ProofDeleteManyArgs} args - Arguments to filter Proofs to delete.
     * @example
     * // Delete a few Proofs
     * const { count } = await prisma.proof.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProofDeleteManyArgs>(args?: SelectSubset<T, ProofDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Proofs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Proofs
     * const proof = await prisma.proof.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProofUpdateManyArgs>(args: SelectSubset<T, ProofUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Proofs and returns the data updated in the database.
     * @param {ProofUpdateManyAndReturnArgs} args - Arguments to update many Proofs.
     * @example
     * // Update many Proofs
     * const proof = await prisma.proof.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Proofs and only return the `proofId`
     * const proofWithProofIdOnly = await prisma.proof.updateManyAndReturn({
     *   select: { proofId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProofUpdateManyAndReturnArgs>(args: SelectSubset<T, ProofUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProofPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Proof.
     * @param {ProofUpsertArgs} args - Arguments to update or create a Proof.
     * @example
     * // Update or create a Proof
     * const proof = await prisma.proof.upsert({
     *   create: {
     *     // ... data to create a Proof
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Proof we want to update
     *   }
     * })
     */
    upsert<T extends ProofUpsertArgs>(args: SelectSubset<T, ProofUpsertArgs<ExtArgs>>): Prisma__ProofClient<$Result.GetResult<Prisma.$ProofPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Proofs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofCountArgs} args - Arguments to filter Proofs to count.
     * @example
     * // Count the number of Proofs
     * const count = await prisma.proof.count({
     *   where: {
     *     // ... the filter for the Proofs we want to count
     *   }
     * })
    **/
    count<T extends ProofCountArgs>(
      args?: Subset<T, ProofCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProofCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Proof.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProofAggregateArgs>(args: Subset<T, ProofAggregateArgs>): Prisma.PrismaPromise<GetProofAggregateType<T>>

    /**
     * Group by Proof.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProofGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProofGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProofGroupByArgs['orderBy'] }
        : { orderBy?: ProofGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProofGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProofGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Proof model
   */
  readonly fields: ProofFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Proof.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProofClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    challenge<T extends Proof$challengeArgs<ExtArgs> = {}>(args?: Subset<T, Proof$challengeArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Proof model
   */
  interface ProofFieldRefs {
    readonly proofId: FieldRef<"Proof", 'String'>
    readonly userId: FieldRef<"Proof", 'String'>
    readonly content: FieldRef<"Proof", 'String'>
    readonly type: FieldRef<"Proof", 'UploadType'>
    readonly date: FieldRef<"Proof", 'DateTime'>
    readonly media: FieldRef<"Proof", 'String'>
    readonly text: FieldRef<"Proof", 'String'>
    readonly challengeId: FieldRef<"Proof", 'Int'>
    readonly validatorId: FieldRef<"Proof", 'String'>
    readonly status: FieldRef<"Proof", 'Status'>
  }
    

  // Custom InputTypes
  /**
   * Proof findUnique
   */
  export type ProofFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proof
     */
    select?: ProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proof
     */
    omit?: ProofOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofInclude<ExtArgs> | null
    /**
     * Filter, which Proof to fetch.
     */
    where: ProofWhereUniqueInput
  }

  /**
   * Proof findUniqueOrThrow
   */
  export type ProofFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proof
     */
    select?: ProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proof
     */
    omit?: ProofOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofInclude<ExtArgs> | null
    /**
     * Filter, which Proof to fetch.
     */
    where: ProofWhereUniqueInput
  }

  /**
   * Proof findFirst
   */
  export type ProofFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proof
     */
    select?: ProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proof
     */
    omit?: ProofOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofInclude<ExtArgs> | null
    /**
     * Filter, which Proof to fetch.
     */
    where?: ProofWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proofs to fetch.
     */
    orderBy?: ProofOrderByWithRelationInput | ProofOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Proofs.
     */
    cursor?: ProofWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proofs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proofs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Proofs.
     */
    distinct?: ProofScalarFieldEnum | ProofScalarFieldEnum[]
  }

  /**
   * Proof findFirstOrThrow
   */
  export type ProofFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proof
     */
    select?: ProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proof
     */
    omit?: ProofOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofInclude<ExtArgs> | null
    /**
     * Filter, which Proof to fetch.
     */
    where?: ProofWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proofs to fetch.
     */
    orderBy?: ProofOrderByWithRelationInput | ProofOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Proofs.
     */
    cursor?: ProofWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proofs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proofs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Proofs.
     */
    distinct?: ProofScalarFieldEnum | ProofScalarFieldEnum[]
  }

  /**
   * Proof findMany
   */
  export type ProofFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proof
     */
    select?: ProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proof
     */
    omit?: ProofOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofInclude<ExtArgs> | null
    /**
     * Filter, which Proofs to fetch.
     */
    where?: ProofWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proofs to fetch.
     */
    orderBy?: ProofOrderByWithRelationInput | ProofOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Proofs.
     */
    cursor?: ProofWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proofs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proofs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Proofs.
     */
    distinct?: ProofScalarFieldEnum | ProofScalarFieldEnum[]
  }

  /**
   * Proof create
   */
  export type ProofCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proof
     */
    select?: ProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proof
     */
    omit?: ProofOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofInclude<ExtArgs> | null
    /**
     * The data needed to create a Proof.
     */
    data: XOR<ProofCreateInput, ProofUncheckedCreateInput>
  }

  /**
   * Proof createMany
   */
  export type ProofCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Proofs.
     */
    data: ProofCreateManyInput | ProofCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Proof createManyAndReturn
   */
  export type ProofCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proof
     */
    select?: ProofSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Proof
     */
    omit?: ProofOmit<ExtArgs> | null
    /**
     * The data used to create many Proofs.
     */
    data: ProofCreateManyInput | ProofCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Proof update
   */
  export type ProofUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proof
     */
    select?: ProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proof
     */
    omit?: ProofOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofInclude<ExtArgs> | null
    /**
     * The data needed to update a Proof.
     */
    data: XOR<ProofUpdateInput, ProofUncheckedUpdateInput>
    /**
     * Choose, which Proof to update.
     */
    where: ProofWhereUniqueInput
  }

  /**
   * Proof updateMany
   */
  export type ProofUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Proofs.
     */
    data: XOR<ProofUpdateManyMutationInput, ProofUncheckedUpdateManyInput>
    /**
     * Filter which Proofs to update
     */
    where?: ProofWhereInput
    /**
     * Limit how many Proofs to update.
     */
    limit?: number
  }

  /**
   * Proof updateManyAndReturn
   */
  export type ProofUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proof
     */
    select?: ProofSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Proof
     */
    omit?: ProofOmit<ExtArgs> | null
    /**
     * The data used to update Proofs.
     */
    data: XOR<ProofUpdateManyMutationInput, ProofUncheckedUpdateManyInput>
    /**
     * Filter which Proofs to update
     */
    where?: ProofWhereInput
    /**
     * Limit how many Proofs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Proof upsert
   */
  export type ProofUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proof
     */
    select?: ProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proof
     */
    omit?: ProofOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofInclude<ExtArgs> | null
    /**
     * The filter to search for the Proof to update in case it exists.
     */
    where: ProofWhereUniqueInput
    /**
     * In case the Proof found by the `where` argument doesn't exist, create a new Proof with this data.
     */
    create: XOR<ProofCreateInput, ProofUncheckedCreateInput>
    /**
     * In case the Proof was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProofUpdateInput, ProofUncheckedUpdateInput>
  }

  /**
   * Proof delete
   */
  export type ProofDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proof
     */
    select?: ProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proof
     */
    omit?: ProofOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofInclude<ExtArgs> | null
    /**
     * Filter which Proof to delete.
     */
    where: ProofWhereUniqueInput
  }

  /**
   * Proof deleteMany
   */
  export type ProofDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Proofs to delete
     */
    where?: ProofWhereInput
    /**
     * Limit how many Proofs to delete.
     */
    limit?: number
  }

  /**
   * Proof.challenge
   */
  export type Proof$challengeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    where?: ChallengeWhereInput
  }

  /**
   * Proof without action
   */
  export type ProofDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proof
     */
    select?: ProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proof
     */
    omit?: ProofOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofInclude<ExtArgs> | null
  }


  /**
   * Model Challenge
   */

  export type AggregateChallenge = {
    _count: ChallengeCountAggregateOutputType | null
    _avg: ChallengeAvgAggregateOutputType | null
    _sum: ChallengeSumAggregateOutputType | null
    _min: ChallengeMinAggregateOutputType | null
    _max: ChallengeMaxAggregateOutputType | null
  }

  export type ChallengeAvgAggregateOutputType = {
    challengeId: number | null
    nbPoints: number | null
  }

  export type ChallengeSumAggregateOutputType = {
    challengeId: number | null
    nbPoints: number | null
  }

  export type ChallengeMinAggregateOutputType = {
    challengeId: number | null
    name: string | null
    description: string | null
    groupId: string | null
    userId: string | null
    userAcceptId: string | null
    defiAccepte: boolean | null
    type: $Enums.UploadType | null
    nbPoints: number | null
    locationName: string | null
    isDeleted: boolean | null
  }

  export type ChallengeMaxAggregateOutputType = {
    challengeId: number | null
    name: string | null
    description: string | null
    groupId: string | null
    userId: string | null
    userAcceptId: string | null
    defiAccepte: boolean | null
    type: $Enums.UploadType | null
    nbPoints: number | null
    locationName: string | null
    isDeleted: boolean | null
  }

  export type ChallengeCountAggregateOutputType = {
    challengeId: number
    name: number
    description: number
    groupId: number
    userId: number
    userAcceptId: number
    defiAccepte: number
    type: number
    nbPoints: number
    locationName: number
    isDeleted: number
    _all: number
  }


  export type ChallengeAvgAggregateInputType = {
    challengeId?: true
    nbPoints?: true
  }

  export type ChallengeSumAggregateInputType = {
    challengeId?: true
    nbPoints?: true
  }

  export type ChallengeMinAggregateInputType = {
    challengeId?: true
    name?: true
    description?: true
    groupId?: true
    userId?: true
    userAcceptId?: true
    defiAccepte?: true
    type?: true
    nbPoints?: true
    locationName?: true
    isDeleted?: true
  }

  export type ChallengeMaxAggregateInputType = {
    challengeId?: true
    name?: true
    description?: true
    groupId?: true
    userId?: true
    userAcceptId?: true
    defiAccepte?: true
    type?: true
    nbPoints?: true
    locationName?: true
    isDeleted?: true
  }

  export type ChallengeCountAggregateInputType = {
    challengeId?: true
    name?: true
    description?: true
    groupId?: true
    userId?: true
    userAcceptId?: true
    defiAccepte?: true
    type?: true
    nbPoints?: true
    locationName?: true
    isDeleted?: true
    _all?: true
  }

  export type ChallengeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Challenge to aggregate.
     */
    where?: ChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Challenges to fetch.
     */
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Challenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Challenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Challenges
    **/
    _count?: true | ChallengeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChallengeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChallengeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChallengeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChallengeMaxAggregateInputType
  }

  export type GetChallengeAggregateType<T extends ChallengeAggregateArgs> = {
        [P in keyof T & keyof AggregateChallenge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChallenge[P]>
      : GetScalarType<T[P], AggregateChallenge[P]>
  }




  export type ChallengeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChallengeWhereInput
    orderBy?: ChallengeOrderByWithAggregationInput | ChallengeOrderByWithAggregationInput[]
    by: ChallengeScalarFieldEnum[] | ChallengeScalarFieldEnum
    having?: ChallengeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChallengeCountAggregateInputType | true
    _avg?: ChallengeAvgAggregateInputType
    _sum?: ChallengeSumAggregateInputType
    _min?: ChallengeMinAggregateInputType
    _max?: ChallengeMaxAggregateInputType
  }

  export type ChallengeGroupByOutputType = {
    challengeId: number
    name: string
    description: string | null
    groupId: string
    userId: string
    userAcceptId: string | null
    defiAccepte: boolean
    type: $Enums.UploadType
    nbPoints: number
    locationName: string
    isDeleted: boolean
    _count: ChallengeCountAggregateOutputType | null
    _avg: ChallengeAvgAggregateOutputType | null
    _sum: ChallengeSumAggregateOutputType | null
    _min: ChallengeMinAggregateOutputType | null
    _max: ChallengeMaxAggregateOutputType | null
  }

  type GetChallengeGroupByPayload<T extends ChallengeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChallengeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChallengeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChallengeGroupByOutputType[P]>
            : GetScalarType<T[P], ChallengeGroupByOutputType[P]>
        }
      >
    >


  export type ChallengeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    challengeId?: boolean
    name?: boolean
    description?: boolean
    groupId?: boolean
    userId?: boolean
    userAcceptId?: boolean
    defiAccepte?: boolean
    type?: boolean
    nbPoints?: boolean
    locationName?: boolean
    isDeleted?: boolean
    group?: boolean | GroupClubDefaultArgs<ExtArgs>
    groupInteSucceed?: boolean | Challenge$groupInteSucceedArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
    proofs?: boolean | Challenge$proofsArgs<ExtArgs>
    _count?: boolean | ChallengeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["challenge"]>

  export type ChallengeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    challengeId?: boolean
    name?: boolean
    description?: boolean
    groupId?: boolean
    userId?: boolean
    userAcceptId?: boolean
    defiAccepte?: boolean
    type?: boolean
    nbPoints?: boolean
    locationName?: boolean
    isDeleted?: boolean
    group?: boolean | GroupClubDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["challenge"]>

  export type ChallengeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    challengeId?: boolean
    name?: boolean
    description?: boolean
    groupId?: boolean
    userId?: boolean
    userAcceptId?: boolean
    defiAccepte?: boolean
    type?: boolean
    nbPoints?: boolean
    locationName?: boolean
    isDeleted?: boolean
    group?: boolean | GroupClubDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["challenge"]>

  export type ChallengeSelectScalar = {
    challengeId?: boolean
    name?: boolean
    description?: boolean
    groupId?: boolean
    userId?: boolean
    userAcceptId?: boolean
    defiAccepte?: boolean
    type?: boolean
    nbPoints?: boolean
    locationName?: boolean
    isDeleted?: boolean
  }

  export type ChallengeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"challengeId" | "name" | "description" | "groupId" | "userId" | "userAcceptId" | "defiAccepte" | "type" | "nbPoints" | "locationName" | "isDeleted", ExtArgs["result"]["challenge"]>
  export type ChallengeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupClubDefaultArgs<ExtArgs>
    groupInteSucceed?: boolean | Challenge$groupInteSucceedArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
    proofs?: boolean | Challenge$proofsArgs<ExtArgs>
    _count?: boolean | ChallengeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChallengeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupClubDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }
  export type ChallengeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupClubDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }

  export type $ChallengePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Challenge"
    objects: {
      group: Prisma.$GroupClubPayload<ExtArgs>
      groupInteSucceed: Prisma.$GroupIntePayload<ExtArgs>[]
      location: Prisma.$LocationPayload<ExtArgs>
      proofs: Prisma.$ProofPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      challengeId: number
      name: string
      description: string | null
      groupId: string
      userId: string
      userAcceptId: string | null
      defiAccepte: boolean
      type: $Enums.UploadType
      nbPoints: number
      locationName: string
      isDeleted: boolean
    }, ExtArgs["result"]["challenge"]>
    composites: {}
  }

  type ChallengeGetPayload<S extends boolean | null | undefined | ChallengeDefaultArgs> = $Result.GetResult<Prisma.$ChallengePayload, S>

  type ChallengeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChallengeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChallengeCountAggregateInputType | true
    }

  export interface ChallengeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Challenge'], meta: { name: 'Challenge' } }
    /**
     * Find zero or one Challenge that matches the filter.
     * @param {ChallengeFindUniqueArgs} args - Arguments to find a Challenge
     * @example
     * // Get one Challenge
     * const challenge = await prisma.challenge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChallengeFindUniqueArgs>(args: SelectSubset<T, ChallengeFindUniqueArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Challenge that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChallengeFindUniqueOrThrowArgs} args - Arguments to find a Challenge
     * @example
     * // Get one Challenge
     * const challenge = await prisma.challenge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChallengeFindUniqueOrThrowArgs>(args: SelectSubset<T, ChallengeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Challenge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeFindFirstArgs} args - Arguments to find a Challenge
     * @example
     * // Get one Challenge
     * const challenge = await prisma.challenge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChallengeFindFirstArgs>(args?: SelectSubset<T, ChallengeFindFirstArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Challenge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeFindFirstOrThrowArgs} args - Arguments to find a Challenge
     * @example
     * // Get one Challenge
     * const challenge = await prisma.challenge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChallengeFindFirstOrThrowArgs>(args?: SelectSubset<T, ChallengeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Challenges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Challenges
     * const challenges = await prisma.challenge.findMany()
     * 
     * // Get first 10 Challenges
     * const challenges = await prisma.challenge.findMany({ take: 10 })
     * 
     * // Only select the `challengeId`
     * const challengeWithChallengeIdOnly = await prisma.challenge.findMany({ select: { challengeId: true } })
     * 
     */
    findMany<T extends ChallengeFindManyArgs>(args?: SelectSubset<T, ChallengeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Challenge.
     * @param {ChallengeCreateArgs} args - Arguments to create a Challenge.
     * @example
     * // Create one Challenge
     * const Challenge = await prisma.challenge.create({
     *   data: {
     *     // ... data to create a Challenge
     *   }
     * })
     * 
     */
    create<T extends ChallengeCreateArgs>(args: SelectSubset<T, ChallengeCreateArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Challenges.
     * @param {ChallengeCreateManyArgs} args - Arguments to create many Challenges.
     * @example
     * // Create many Challenges
     * const challenge = await prisma.challenge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChallengeCreateManyArgs>(args?: SelectSubset<T, ChallengeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Challenges and returns the data saved in the database.
     * @param {ChallengeCreateManyAndReturnArgs} args - Arguments to create many Challenges.
     * @example
     * // Create many Challenges
     * const challenge = await prisma.challenge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Challenges and only return the `challengeId`
     * const challengeWithChallengeIdOnly = await prisma.challenge.createManyAndReturn({
     *   select: { challengeId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChallengeCreateManyAndReturnArgs>(args?: SelectSubset<T, ChallengeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Challenge.
     * @param {ChallengeDeleteArgs} args - Arguments to delete one Challenge.
     * @example
     * // Delete one Challenge
     * const Challenge = await prisma.challenge.delete({
     *   where: {
     *     // ... filter to delete one Challenge
     *   }
     * })
     * 
     */
    delete<T extends ChallengeDeleteArgs>(args: SelectSubset<T, ChallengeDeleteArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Challenge.
     * @param {ChallengeUpdateArgs} args - Arguments to update one Challenge.
     * @example
     * // Update one Challenge
     * const challenge = await prisma.challenge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChallengeUpdateArgs>(args: SelectSubset<T, ChallengeUpdateArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Challenges.
     * @param {ChallengeDeleteManyArgs} args - Arguments to filter Challenges to delete.
     * @example
     * // Delete a few Challenges
     * const { count } = await prisma.challenge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChallengeDeleteManyArgs>(args?: SelectSubset<T, ChallengeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Challenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Challenges
     * const challenge = await prisma.challenge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChallengeUpdateManyArgs>(args: SelectSubset<T, ChallengeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Challenges and returns the data updated in the database.
     * @param {ChallengeUpdateManyAndReturnArgs} args - Arguments to update many Challenges.
     * @example
     * // Update many Challenges
     * const challenge = await prisma.challenge.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Challenges and only return the `challengeId`
     * const challengeWithChallengeIdOnly = await prisma.challenge.updateManyAndReturn({
     *   select: { challengeId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChallengeUpdateManyAndReturnArgs>(args: SelectSubset<T, ChallengeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Challenge.
     * @param {ChallengeUpsertArgs} args - Arguments to update or create a Challenge.
     * @example
     * // Update or create a Challenge
     * const challenge = await prisma.challenge.upsert({
     *   create: {
     *     // ... data to create a Challenge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Challenge we want to update
     *   }
     * })
     */
    upsert<T extends ChallengeUpsertArgs>(args: SelectSubset<T, ChallengeUpsertArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Challenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeCountArgs} args - Arguments to filter Challenges to count.
     * @example
     * // Count the number of Challenges
     * const count = await prisma.challenge.count({
     *   where: {
     *     // ... the filter for the Challenges we want to count
     *   }
     * })
    **/
    count<T extends ChallengeCountArgs>(
      args?: Subset<T, ChallengeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChallengeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Challenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChallengeAggregateArgs>(args: Subset<T, ChallengeAggregateArgs>): Prisma.PrismaPromise<GetChallengeAggregateType<T>>

    /**
     * Group by Challenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChallengeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChallengeGroupByArgs['orderBy'] }
        : { orderBy?: ChallengeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChallengeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChallengeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Challenge model
   */
  readonly fields: ChallengeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Challenge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChallengeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    group<T extends GroupClubDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GroupClubDefaultArgs<ExtArgs>>): Prisma__GroupClubClient<$Result.GetResult<Prisma.$GroupClubPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    groupInteSucceed<T extends Challenge$groupInteSucceedArgs<ExtArgs> = {}>(args?: Subset<T, Challenge$groupInteSucceedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupIntePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    location<T extends LocationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LocationDefaultArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    proofs<T extends Challenge$proofsArgs<ExtArgs> = {}>(args?: Subset<T, Challenge$proofsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProofPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Challenge model
   */
  interface ChallengeFieldRefs {
    readonly challengeId: FieldRef<"Challenge", 'Int'>
    readonly name: FieldRef<"Challenge", 'String'>
    readonly description: FieldRef<"Challenge", 'String'>
    readonly groupId: FieldRef<"Challenge", 'String'>
    readonly userId: FieldRef<"Challenge", 'String'>
    readonly userAcceptId: FieldRef<"Challenge", 'String'>
    readonly defiAccepte: FieldRef<"Challenge", 'Boolean'>
    readonly type: FieldRef<"Challenge", 'UploadType'>
    readonly nbPoints: FieldRef<"Challenge", 'Int'>
    readonly locationName: FieldRef<"Challenge", 'String'>
    readonly isDeleted: FieldRef<"Challenge", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Challenge findUnique
   */
  export type ChallengeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter, which Challenge to fetch.
     */
    where: ChallengeWhereUniqueInput
  }

  /**
   * Challenge findUniqueOrThrow
   */
  export type ChallengeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter, which Challenge to fetch.
     */
    where: ChallengeWhereUniqueInput
  }

  /**
   * Challenge findFirst
   */
  export type ChallengeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter, which Challenge to fetch.
     */
    where?: ChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Challenges to fetch.
     */
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Challenges.
     */
    cursor?: ChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Challenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Challenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Challenges.
     */
    distinct?: ChallengeScalarFieldEnum | ChallengeScalarFieldEnum[]
  }

  /**
   * Challenge findFirstOrThrow
   */
  export type ChallengeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter, which Challenge to fetch.
     */
    where?: ChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Challenges to fetch.
     */
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Challenges.
     */
    cursor?: ChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Challenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Challenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Challenges.
     */
    distinct?: ChallengeScalarFieldEnum | ChallengeScalarFieldEnum[]
  }

  /**
   * Challenge findMany
   */
  export type ChallengeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter, which Challenges to fetch.
     */
    where?: ChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Challenges to fetch.
     */
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Challenges.
     */
    cursor?: ChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Challenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Challenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Challenges.
     */
    distinct?: ChallengeScalarFieldEnum | ChallengeScalarFieldEnum[]
  }

  /**
   * Challenge create
   */
  export type ChallengeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * The data needed to create a Challenge.
     */
    data: XOR<ChallengeCreateInput, ChallengeUncheckedCreateInput>
  }

  /**
   * Challenge createMany
   */
  export type ChallengeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Challenges.
     */
    data: ChallengeCreateManyInput | ChallengeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Challenge createManyAndReturn
   */
  export type ChallengeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * The data used to create many Challenges.
     */
    data: ChallengeCreateManyInput | ChallengeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Challenge update
   */
  export type ChallengeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * The data needed to update a Challenge.
     */
    data: XOR<ChallengeUpdateInput, ChallengeUncheckedUpdateInput>
    /**
     * Choose, which Challenge to update.
     */
    where: ChallengeWhereUniqueInput
  }

  /**
   * Challenge updateMany
   */
  export type ChallengeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Challenges.
     */
    data: XOR<ChallengeUpdateManyMutationInput, ChallengeUncheckedUpdateManyInput>
    /**
     * Filter which Challenges to update
     */
    where?: ChallengeWhereInput
    /**
     * Limit how many Challenges to update.
     */
    limit?: number
  }

  /**
   * Challenge updateManyAndReturn
   */
  export type ChallengeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * The data used to update Challenges.
     */
    data: XOR<ChallengeUpdateManyMutationInput, ChallengeUncheckedUpdateManyInput>
    /**
     * Filter which Challenges to update
     */
    where?: ChallengeWhereInput
    /**
     * Limit how many Challenges to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Challenge upsert
   */
  export type ChallengeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * The filter to search for the Challenge to update in case it exists.
     */
    where: ChallengeWhereUniqueInput
    /**
     * In case the Challenge found by the `where` argument doesn't exist, create a new Challenge with this data.
     */
    create: XOR<ChallengeCreateInput, ChallengeUncheckedCreateInput>
    /**
     * In case the Challenge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChallengeUpdateInput, ChallengeUncheckedUpdateInput>
  }

  /**
   * Challenge delete
   */
  export type ChallengeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter which Challenge to delete.
     */
    where: ChallengeWhereUniqueInput
  }

  /**
   * Challenge deleteMany
   */
  export type ChallengeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Challenges to delete
     */
    where?: ChallengeWhereInput
    /**
     * Limit how many Challenges to delete.
     */
    limit?: number
  }

  /**
   * Challenge.groupInteSucceed
   */
  export type Challenge$groupInteSucceedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupInte
     */
    select?: GroupInteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupInte
     */
    omit?: GroupInteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInteInclude<ExtArgs> | null
    where?: GroupInteWhereInput
    orderBy?: GroupInteOrderByWithRelationInput | GroupInteOrderByWithRelationInput[]
    cursor?: GroupInteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupInteScalarFieldEnum | GroupInteScalarFieldEnum[]
  }

  /**
   * Challenge.proofs
   */
  export type Challenge$proofsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proof
     */
    select?: ProofSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proof
     */
    omit?: ProofOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProofInclude<ExtArgs> | null
    where?: ProofWhereInput
    orderBy?: ProofOrderByWithRelationInput | ProofOrderByWithRelationInput[]
    cursor?: ProofWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProofScalarFieldEnum | ProofScalarFieldEnum[]
  }

  /**
   * Challenge without action
   */
  export type ChallengeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
  }


  /**
   * Model Location
   */

  export type AggregateLocation = {
    _count: LocationCountAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  export type LocationMinAggregateOutputType = {
    name: string | null
  }

  export type LocationMaxAggregateOutputType = {
    name: string | null
  }

  export type LocationCountAggregateOutputType = {
    name: number
    _all: number
  }


  export type LocationMinAggregateInputType = {
    name?: true
  }

  export type LocationMaxAggregateInputType = {
    name?: true
  }

  export type LocationCountAggregateInputType = {
    name?: true
    _all?: true
  }

  export type LocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Location to aggregate.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Locations
    **/
    _count?: true | LocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationMaxAggregateInputType
  }

  export type GetLocationAggregateType<T extends LocationAggregateArgs> = {
        [P in keyof T & keyof AggregateLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocation[P]>
      : GetScalarType<T[P], AggregateLocation[P]>
  }




  export type LocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput
    orderBy?: LocationOrderByWithAggregationInput | LocationOrderByWithAggregationInput[]
    by: LocationScalarFieldEnum[] | LocationScalarFieldEnum
    having?: LocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationCountAggregateInputType | true
    _min?: LocationMinAggregateInputType
    _max?: LocationMaxAggregateInputType
  }

  export type LocationGroupByOutputType = {
    name: string
    _count: LocationCountAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  type GetLocationGroupByPayload<T extends LocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationGroupByOutputType[P]>
            : GetScalarType<T[P], LocationGroupByOutputType[P]>
        }
      >
    >


  export type LocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
    challenge?: boolean | Location$challengeArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
  }, ExtArgs["result"]["location"]>

  export type LocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
  }, ExtArgs["result"]["location"]>

  export type LocationSelectScalar = {
    name?: boolean
  }

  export type LocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"name", ExtArgs["result"]["location"]>
  export type LocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    challenge?: boolean | Location$challengeArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Location"
    objects: {
      challenge: Prisma.$ChallengePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      name: string
    }, ExtArgs["result"]["location"]>
    composites: {}
  }

  type LocationGetPayload<S extends boolean | null | undefined | LocationDefaultArgs> = $Result.GetResult<Prisma.$LocationPayload, S>

  type LocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LocationCountAggregateInputType | true
    }

  export interface LocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Location'], meta: { name: 'Location' } }
    /**
     * Find zero or one Location that matches the filter.
     * @param {LocationFindUniqueArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocationFindUniqueArgs>(args: SelectSubset<T, LocationFindUniqueArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Location that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocationFindUniqueOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocationFindUniqueOrThrowArgs>(args: SelectSubset<T, LocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocationFindFirstArgs>(args?: SelectSubset<T, LocationFindFirstArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocationFindFirstOrThrowArgs>(args?: SelectSubset<T, LocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Locations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Locations
     * const locations = await prisma.location.findMany()
     * 
     * // Get first 10 Locations
     * const locations = await prisma.location.findMany({ take: 10 })
     * 
     * // Only select the `name`
     * const locationWithNameOnly = await prisma.location.findMany({ select: { name: true } })
     * 
     */
    findMany<T extends LocationFindManyArgs>(args?: SelectSubset<T, LocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Location.
     * @param {LocationCreateArgs} args - Arguments to create a Location.
     * @example
     * // Create one Location
     * const Location = await prisma.location.create({
     *   data: {
     *     // ... data to create a Location
     *   }
     * })
     * 
     */
    create<T extends LocationCreateArgs>(args: SelectSubset<T, LocationCreateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Locations.
     * @param {LocationCreateManyArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocationCreateManyArgs>(args?: SelectSubset<T, LocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Locations and returns the data saved in the database.
     * @param {LocationCreateManyAndReturnArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Locations and only return the `name`
     * const locationWithNameOnly = await prisma.location.createManyAndReturn({
     *   select: { name: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LocationCreateManyAndReturnArgs>(args?: SelectSubset<T, LocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Location.
     * @param {LocationDeleteArgs} args - Arguments to delete one Location.
     * @example
     * // Delete one Location
     * const Location = await prisma.location.delete({
     *   where: {
     *     // ... filter to delete one Location
     *   }
     * })
     * 
     */
    delete<T extends LocationDeleteArgs>(args: SelectSubset<T, LocationDeleteArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Location.
     * @param {LocationUpdateArgs} args - Arguments to update one Location.
     * @example
     * // Update one Location
     * const location = await prisma.location.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocationUpdateArgs>(args: SelectSubset<T, LocationUpdateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Locations.
     * @param {LocationDeleteManyArgs} args - Arguments to filter Locations to delete.
     * @example
     * // Delete a few Locations
     * const { count } = await prisma.location.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocationDeleteManyArgs>(args?: SelectSubset<T, LocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocationUpdateManyArgs>(args: SelectSubset<T, LocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations and returns the data updated in the database.
     * @param {LocationUpdateManyAndReturnArgs} args - Arguments to update many Locations.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Locations and only return the `name`
     * const locationWithNameOnly = await prisma.location.updateManyAndReturn({
     *   select: { name: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LocationUpdateManyAndReturnArgs>(args: SelectSubset<T, LocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Location.
     * @param {LocationUpsertArgs} args - Arguments to update or create a Location.
     * @example
     * // Update or create a Location
     * const location = await prisma.location.upsert({
     *   create: {
     *     // ... data to create a Location
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Location we want to update
     *   }
     * })
     */
    upsert<T extends LocationUpsertArgs>(args: SelectSubset<T, LocationUpsertArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCountArgs} args - Arguments to filter Locations to count.
     * @example
     * // Count the number of Locations
     * const count = await prisma.location.count({
     *   where: {
     *     // ... the filter for the Locations we want to count
     *   }
     * })
    **/
    count<T extends LocationCountArgs>(
      args?: Subset<T, LocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LocationAggregateArgs>(args: Subset<T, LocationAggregateArgs>): Prisma.PrismaPromise<GetLocationAggregateType<T>>

    /**
     * Group by Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocationGroupByArgs['orderBy'] }
        : { orderBy?: LocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Location model
   */
  readonly fields: LocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Location.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    challenge<T extends Location$challengeArgs<ExtArgs> = {}>(args?: Subset<T, Location$challengeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Location model
   */
  interface LocationFieldRefs {
    readonly name: FieldRef<"Location", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Location findUnique
   */
  export type LocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findUniqueOrThrow
   */
  export type LocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findFirst
   */
  export type LocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findFirstOrThrow
   */
  export type LocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findMany
   */
  export type LocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Locations to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location create
   */
  export type LocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to create a Location.
     */
    data: XOR<LocationCreateInput, LocationUncheckedCreateInput>
  }

  /**
   * Location createMany
   */
  export type LocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Location createManyAndReturn
   */
  export type LocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Location update
   */
  export type LocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to update a Location.
     */
    data: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
    /**
     * Choose, which Location to update.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location updateMany
   */
  export type LocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
  }

  /**
   * Location updateManyAndReturn
   */
  export type LocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
  }

  /**
   * Location upsert
   */
  export type LocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The filter to search for the Location to update in case it exists.
     */
    where: LocationWhereUniqueInput
    /**
     * In case the Location found by the `where` argument doesn't exist, create a new Location with this data.
     */
    create: XOR<LocationCreateInput, LocationUncheckedCreateInput>
    /**
     * In case the Location was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
  }

  /**
   * Location delete
   */
  export type LocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter which Location to delete.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location deleteMany
   */
  export type LocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Locations to delete
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to delete.
     */
    limit?: number
  }

  /**
   * Location.challenge
   */
  export type Location$challengeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    where?: ChallengeWhereInput
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    cursor?: ChallengeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChallengeScalarFieldEnum | ChallengeScalarFieldEnum[]
  }

  /**
   * Location without action
   */
  export type LocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    is1A: 'is1A',
    profilePictureURL: 'profilePictureURL',
    groupInteId: 'groupInteId',
    points: 'points',
    isAdmin: 'isAdmin'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const GroupClubScalarFieldEnum: {
    groupId: 'groupId',
    name: 'name',
    pictureURL: 'pictureURL'
  };

  export type GroupClubScalarFieldEnum = (typeof GroupClubScalarFieldEnum)[keyof typeof GroupClubScalarFieldEnum]


  export const GroupInteScalarFieldEnum: {
    groupId: 'groupId',
    name: 'name',
    pictureURL: 'pictureURL',
    points: 'points'
  };

  export type GroupInteScalarFieldEnum = (typeof GroupInteScalarFieldEnum)[keyof typeof GroupInteScalarFieldEnum]


  export const ProofScalarFieldEnum: {
    proofId: 'proofId',
    userId: 'userId',
    content: 'content',
    type: 'type',
    date: 'date',
    media: 'media',
    text: 'text',
    challengeId: 'challengeId',
    validatorId: 'validatorId',
    status: 'status'
  };

  export type ProofScalarFieldEnum = (typeof ProofScalarFieldEnum)[keyof typeof ProofScalarFieldEnum]


  export const ChallengeScalarFieldEnum: {
    challengeId: 'challengeId',
    name: 'name',
    description: 'description',
    groupId: 'groupId',
    userId: 'userId',
    userAcceptId: 'userAcceptId',
    defiAccepte: 'defiAccepte',
    type: 'type',
    nbPoints: 'nbPoints',
    locationName: 'locationName',
    isDeleted: 'isDeleted'
  };

  export type ChallengeScalarFieldEnum = (typeof ChallengeScalarFieldEnum)[keyof typeof ChallengeScalarFieldEnum]


  export const LocationScalarFieldEnum: {
    name: 'name'
  };

  export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'UploadType'
   */
  export type EnumUploadTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UploadType'>
    


  /**
   * Reference to a field of type 'UploadType[]'
   */
  export type ListEnumUploadTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UploadType[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Status'
   */
  export type EnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status'>
    


  /**
   * Reference to a field of type 'Status[]'
   */
  export type ListEnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    is1A?: BoolFilter<"User"> | boolean
    profilePictureURL?: StringNullableFilter<"User"> | string | null
    groupInteId?: StringNullableFilter<"User"> | string | null
    points?: IntFilter<"User"> | number
    isAdmin?: BoolFilter<"User"> | boolean
    group?: GroupClubListRelationFilter
    groupBoard?: GroupClubListRelationFilter
    groupInte?: XOR<GroupInteNullableScalarRelationFilter, GroupInteWhereInput> | null
    proof?: ProofListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    is1A?: SortOrder
    profilePictureURL?: SortOrderInput | SortOrder
    groupInteId?: SortOrderInput | SortOrder
    points?: SortOrder
    isAdmin?: SortOrder
    group?: GroupClubOrderByRelationAggregateInput
    groupBoard?: GroupClubOrderByRelationAggregateInput
    groupInte?: GroupInteOrderByWithRelationInput
    proof?: ProofOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    is1A?: BoolFilter<"User"> | boolean
    profilePictureURL?: StringNullableFilter<"User"> | string | null
    groupInteId?: StringNullableFilter<"User"> | string | null
    points?: IntFilter<"User"> | number
    isAdmin?: BoolFilter<"User"> | boolean
    group?: GroupClubListRelationFilter
    groupBoard?: GroupClubListRelationFilter
    groupInte?: XOR<GroupInteNullableScalarRelationFilter, GroupInteWhereInput> | null
    proof?: ProofListRelationFilter
  }, "id">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    is1A?: SortOrder
    profilePictureURL?: SortOrderInput | SortOrder
    groupInteId?: SortOrderInput | SortOrder
    points?: SortOrder
    isAdmin?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    is1A?: BoolWithAggregatesFilter<"User"> | boolean
    profilePictureURL?: StringNullableWithAggregatesFilter<"User"> | string | null
    groupInteId?: StringNullableWithAggregatesFilter<"User"> | string | null
    points?: IntWithAggregatesFilter<"User"> | number
    isAdmin?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type GroupClubWhereInput = {
    AND?: GroupClubWhereInput | GroupClubWhereInput[]
    OR?: GroupClubWhereInput[]
    NOT?: GroupClubWhereInput | GroupClubWhereInput[]
    groupId?: StringFilter<"GroupClub"> | string
    name?: StringFilter<"GroupClub"> | string
    pictureURL?: StringNullableFilter<"GroupClub"> | string | null
    users?: UserListRelationFilter
    board?: UserListRelationFilter
    challenge?: ChallengeListRelationFilter
  }

  export type GroupClubOrderByWithRelationInput = {
    groupId?: SortOrder
    name?: SortOrder
    pictureURL?: SortOrderInput | SortOrder
    users?: UserOrderByRelationAggregateInput
    board?: UserOrderByRelationAggregateInput
    challenge?: ChallengeOrderByRelationAggregateInput
  }

  export type GroupClubWhereUniqueInput = Prisma.AtLeast<{
    groupId?: string
    AND?: GroupClubWhereInput | GroupClubWhereInput[]
    OR?: GroupClubWhereInput[]
    NOT?: GroupClubWhereInput | GroupClubWhereInput[]
    name?: StringFilter<"GroupClub"> | string
    pictureURL?: StringNullableFilter<"GroupClub"> | string | null
    users?: UserListRelationFilter
    board?: UserListRelationFilter
    challenge?: ChallengeListRelationFilter
  }, "groupId">

  export type GroupClubOrderByWithAggregationInput = {
    groupId?: SortOrder
    name?: SortOrder
    pictureURL?: SortOrderInput | SortOrder
    _count?: GroupClubCountOrderByAggregateInput
    _max?: GroupClubMaxOrderByAggregateInput
    _min?: GroupClubMinOrderByAggregateInput
  }

  export type GroupClubScalarWhereWithAggregatesInput = {
    AND?: GroupClubScalarWhereWithAggregatesInput | GroupClubScalarWhereWithAggregatesInput[]
    OR?: GroupClubScalarWhereWithAggregatesInput[]
    NOT?: GroupClubScalarWhereWithAggregatesInput | GroupClubScalarWhereWithAggregatesInput[]
    groupId?: StringWithAggregatesFilter<"GroupClub"> | string
    name?: StringWithAggregatesFilter<"GroupClub"> | string
    pictureURL?: StringNullableWithAggregatesFilter<"GroupClub"> | string | null
  }

  export type GroupInteWhereInput = {
    AND?: GroupInteWhereInput | GroupInteWhereInput[]
    OR?: GroupInteWhereInput[]
    NOT?: GroupInteWhereInput | GroupInteWhereInput[]
    groupId?: StringFilter<"GroupInte"> | string
    name?: StringFilter<"GroupInte"> | string
    pictureURL?: StringNullableFilter<"GroupInte"> | string | null
    points?: IntFilter<"GroupInte"> | number
    usersInte?: UserListRelationFilter
    challengeSucceed?: ChallengeListRelationFilter
  }

  export type GroupInteOrderByWithRelationInput = {
    groupId?: SortOrder
    name?: SortOrder
    pictureURL?: SortOrderInput | SortOrder
    points?: SortOrder
    usersInte?: UserOrderByRelationAggregateInput
    challengeSucceed?: ChallengeOrderByRelationAggregateInput
  }

  export type GroupInteWhereUniqueInput = Prisma.AtLeast<{
    groupId?: string
    AND?: GroupInteWhereInput | GroupInteWhereInput[]
    OR?: GroupInteWhereInput[]
    NOT?: GroupInteWhereInput | GroupInteWhereInput[]
    name?: StringFilter<"GroupInte"> | string
    pictureURL?: StringNullableFilter<"GroupInte"> | string | null
    points?: IntFilter<"GroupInte"> | number
    usersInte?: UserListRelationFilter
    challengeSucceed?: ChallengeListRelationFilter
  }, "groupId">

  export type GroupInteOrderByWithAggregationInput = {
    groupId?: SortOrder
    name?: SortOrder
    pictureURL?: SortOrderInput | SortOrder
    points?: SortOrder
    _count?: GroupInteCountOrderByAggregateInput
    _avg?: GroupInteAvgOrderByAggregateInput
    _max?: GroupInteMaxOrderByAggregateInput
    _min?: GroupInteMinOrderByAggregateInput
    _sum?: GroupInteSumOrderByAggregateInput
  }

  export type GroupInteScalarWhereWithAggregatesInput = {
    AND?: GroupInteScalarWhereWithAggregatesInput | GroupInteScalarWhereWithAggregatesInput[]
    OR?: GroupInteScalarWhereWithAggregatesInput[]
    NOT?: GroupInteScalarWhereWithAggregatesInput | GroupInteScalarWhereWithAggregatesInput[]
    groupId?: StringWithAggregatesFilter<"GroupInte"> | string
    name?: StringWithAggregatesFilter<"GroupInte"> | string
    pictureURL?: StringNullableWithAggregatesFilter<"GroupInte"> | string | null
    points?: IntWithAggregatesFilter<"GroupInte"> | number
  }

  export type ProofWhereInput = {
    AND?: ProofWhereInput | ProofWhereInput[]
    OR?: ProofWhereInput[]
    NOT?: ProofWhereInput | ProofWhereInput[]
    proofId?: StringFilter<"Proof"> | string
    userId?: StringFilter<"Proof"> | string
    content?: StringFilter<"Proof"> | string
    type?: EnumUploadTypeFilter<"Proof"> | $Enums.UploadType
    date?: DateTimeFilter<"Proof"> | Date | string
    media?: StringNullableFilter<"Proof"> | string | null
    text?: StringNullableFilter<"Proof"> | string | null
    challengeId?: IntNullableFilter<"Proof"> | number | null
    validatorId?: StringNullableFilter<"Proof"> | string | null
    status?: EnumStatusFilter<"Proof"> | $Enums.Status
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    challenge?: XOR<ChallengeNullableScalarRelationFilter, ChallengeWhereInput> | null
  }

  export type ProofOrderByWithRelationInput = {
    proofId?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    date?: SortOrder
    media?: SortOrderInput | SortOrder
    text?: SortOrderInput | SortOrder
    challengeId?: SortOrderInput | SortOrder
    validatorId?: SortOrderInput | SortOrder
    status?: SortOrder
    user?: UserOrderByWithRelationInput
    challenge?: ChallengeOrderByWithRelationInput
  }

  export type ProofWhereUniqueInput = Prisma.AtLeast<{
    proofId?: string
    AND?: ProofWhereInput | ProofWhereInput[]
    OR?: ProofWhereInput[]
    NOT?: ProofWhereInput | ProofWhereInput[]
    userId?: StringFilter<"Proof"> | string
    content?: StringFilter<"Proof"> | string
    type?: EnumUploadTypeFilter<"Proof"> | $Enums.UploadType
    date?: DateTimeFilter<"Proof"> | Date | string
    media?: StringNullableFilter<"Proof"> | string | null
    text?: StringNullableFilter<"Proof"> | string | null
    challengeId?: IntNullableFilter<"Proof"> | number | null
    validatorId?: StringNullableFilter<"Proof"> | string | null
    status?: EnumStatusFilter<"Proof"> | $Enums.Status
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    challenge?: XOR<ChallengeNullableScalarRelationFilter, ChallengeWhereInput> | null
  }, "proofId">

  export type ProofOrderByWithAggregationInput = {
    proofId?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    date?: SortOrder
    media?: SortOrderInput | SortOrder
    text?: SortOrderInput | SortOrder
    challengeId?: SortOrderInput | SortOrder
    validatorId?: SortOrderInput | SortOrder
    status?: SortOrder
    _count?: ProofCountOrderByAggregateInput
    _avg?: ProofAvgOrderByAggregateInput
    _max?: ProofMaxOrderByAggregateInput
    _min?: ProofMinOrderByAggregateInput
    _sum?: ProofSumOrderByAggregateInput
  }

  export type ProofScalarWhereWithAggregatesInput = {
    AND?: ProofScalarWhereWithAggregatesInput | ProofScalarWhereWithAggregatesInput[]
    OR?: ProofScalarWhereWithAggregatesInput[]
    NOT?: ProofScalarWhereWithAggregatesInput | ProofScalarWhereWithAggregatesInput[]
    proofId?: StringWithAggregatesFilter<"Proof"> | string
    userId?: StringWithAggregatesFilter<"Proof"> | string
    content?: StringWithAggregatesFilter<"Proof"> | string
    type?: EnumUploadTypeWithAggregatesFilter<"Proof"> | $Enums.UploadType
    date?: DateTimeWithAggregatesFilter<"Proof"> | Date | string
    media?: StringNullableWithAggregatesFilter<"Proof"> | string | null
    text?: StringNullableWithAggregatesFilter<"Proof"> | string | null
    challengeId?: IntNullableWithAggregatesFilter<"Proof"> | number | null
    validatorId?: StringNullableWithAggregatesFilter<"Proof"> | string | null
    status?: EnumStatusWithAggregatesFilter<"Proof"> | $Enums.Status
  }

  export type ChallengeWhereInput = {
    AND?: ChallengeWhereInput | ChallengeWhereInput[]
    OR?: ChallengeWhereInput[]
    NOT?: ChallengeWhereInput | ChallengeWhereInput[]
    challengeId?: IntFilter<"Challenge"> | number
    name?: StringFilter<"Challenge"> | string
    description?: StringNullableFilter<"Challenge"> | string | null
    groupId?: StringFilter<"Challenge"> | string
    userId?: StringFilter<"Challenge"> | string
    userAcceptId?: StringNullableFilter<"Challenge"> | string | null
    defiAccepte?: BoolFilter<"Challenge"> | boolean
    type?: EnumUploadTypeFilter<"Challenge"> | $Enums.UploadType
    nbPoints?: IntFilter<"Challenge"> | number
    locationName?: StringFilter<"Challenge"> | string
    isDeleted?: BoolFilter<"Challenge"> | boolean
    group?: XOR<GroupClubScalarRelationFilter, GroupClubWhereInput>
    groupInteSucceed?: GroupInteListRelationFilter
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
    proofs?: ProofListRelationFilter
  }

  export type ChallengeOrderByWithRelationInput = {
    challengeId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    groupId?: SortOrder
    userId?: SortOrder
    userAcceptId?: SortOrderInput | SortOrder
    defiAccepte?: SortOrder
    type?: SortOrder
    nbPoints?: SortOrder
    locationName?: SortOrder
    isDeleted?: SortOrder
    group?: GroupClubOrderByWithRelationInput
    groupInteSucceed?: GroupInteOrderByRelationAggregateInput
    location?: LocationOrderByWithRelationInput
    proofs?: ProofOrderByRelationAggregateInput
  }

  export type ChallengeWhereUniqueInput = Prisma.AtLeast<{
    challengeId?: number
    AND?: ChallengeWhereInput | ChallengeWhereInput[]
    OR?: ChallengeWhereInput[]
    NOT?: ChallengeWhereInput | ChallengeWhereInput[]
    name?: StringFilter<"Challenge"> | string
    description?: StringNullableFilter<"Challenge"> | string | null
    groupId?: StringFilter<"Challenge"> | string
    userId?: StringFilter<"Challenge"> | string
    userAcceptId?: StringNullableFilter<"Challenge"> | string | null
    defiAccepte?: BoolFilter<"Challenge"> | boolean
    type?: EnumUploadTypeFilter<"Challenge"> | $Enums.UploadType
    nbPoints?: IntFilter<"Challenge"> | number
    locationName?: StringFilter<"Challenge"> | string
    isDeleted?: BoolFilter<"Challenge"> | boolean
    group?: XOR<GroupClubScalarRelationFilter, GroupClubWhereInput>
    groupInteSucceed?: GroupInteListRelationFilter
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
    proofs?: ProofListRelationFilter
  }, "challengeId">

  export type ChallengeOrderByWithAggregationInput = {
    challengeId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    groupId?: SortOrder
    userId?: SortOrder
    userAcceptId?: SortOrderInput | SortOrder
    defiAccepte?: SortOrder
    type?: SortOrder
    nbPoints?: SortOrder
    locationName?: SortOrder
    isDeleted?: SortOrder
    _count?: ChallengeCountOrderByAggregateInput
    _avg?: ChallengeAvgOrderByAggregateInput
    _max?: ChallengeMaxOrderByAggregateInput
    _min?: ChallengeMinOrderByAggregateInput
    _sum?: ChallengeSumOrderByAggregateInput
  }

  export type ChallengeScalarWhereWithAggregatesInput = {
    AND?: ChallengeScalarWhereWithAggregatesInput | ChallengeScalarWhereWithAggregatesInput[]
    OR?: ChallengeScalarWhereWithAggregatesInput[]
    NOT?: ChallengeScalarWhereWithAggregatesInput | ChallengeScalarWhereWithAggregatesInput[]
    challengeId?: IntWithAggregatesFilter<"Challenge"> | number
    name?: StringWithAggregatesFilter<"Challenge"> | string
    description?: StringNullableWithAggregatesFilter<"Challenge"> | string | null
    groupId?: StringWithAggregatesFilter<"Challenge"> | string
    userId?: StringWithAggregatesFilter<"Challenge"> | string
    userAcceptId?: StringNullableWithAggregatesFilter<"Challenge"> | string | null
    defiAccepte?: BoolWithAggregatesFilter<"Challenge"> | boolean
    type?: EnumUploadTypeWithAggregatesFilter<"Challenge"> | $Enums.UploadType
    nbPoints?: IntWithAggregatesFilter<"Challenge"> | number
    locationName?: StringWithAggregatesFilter<"Challenge"> | string
    isDeleted?: BoolWithAggregatesFilter<"Challenge"> | boolean
  }

  export type LocationWhereInput = {
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    name?: StringFilter<"Location"> | string
    challenge?: ChallengeListRelationFilter
  }

  export type LocationOrderByWithRelationInput = {
    name?: SortOrder
    challenge?: ChallengeOrderByRelationAggregateInput
  }

  export type LocationWhereUniqueInput = Prisma.AtLeast<{
    name?: string
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    challenge?: ChallengeListRelationFilter
  }, "name">

  export type LocationOrderByWithAggregationInput = {
    name?: SortOrder
    _count?: LocationCountOrderByAggregateInput
    _max?: LocationMaxOrderByAggregateInput
    _min?: LocationMinOrderByAggregateInput
  }

  export type LocationScalarWhereWithAggregatesInput = {
    AND?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    OR?: LocationScalarWhereWithAggregatesInput[]
    NOT?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    name?: StringWithAggregatesFilter<"Location"> | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    is1A: boolean
    profilePictureURL?: string | null
    points?: number
    isAdmin?: boolean
    group?: GroupClubCreateNestedManyWithoutUsersInput
    groupBoard?: GroupClubCreateNestedManyWithoutBoardInput
    groupInte?: GroupInteCreateNestedOneWithoutUsersInteInput
    proof?: ProofCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    is1A: boolean
    profilePictureURL?: string | null
    groupInteId?: string | null
    points?: number
    isAdmin?: boolean
    group?: GroupClubUncheckedCreateNestedManyWithoutUsersInput
    groupBoard?: GroupClubUncheckedCreateNestedManyWithoutBoardInput
    proof?: ProofUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is1A?: BoolFieldUpdateOperationsInput | boolean
    profilePictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    group?: GroupClubUpdateManyWithoutUsersNestedInput
    groupBoard?: GroupClubUpdateManyWithoutBoardNestedInput
    groupInte?: GroupInteUpdateOneWithoutUsersInteNestedInput
    proof?: ProofUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is1A?: BoolFieldUpdateOperationsInput | boolean
    profilePictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    groupInteId?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    group?: GroupClubUncheckedUpdateManyWithoutUsersNestedInput
    groupBoard?: GroupClubUncheckedUpdateManyWithoutBoardNestedInput
    proof?: ProofUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    is1A: boolean
    profilePictureURL?: string | null
    groupInteId?: string | null
    points?: number
    isAdmin?: boolean
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is1A?: BoolFieldUpdateOperationsInput | boolean
    profilePictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is1A?: BoolFieldUpdateOperationsInput | boolean
    profilePictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    groupInteId?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GroupClubCreateInput = {
    groupId: string
    name: string
    pictureURL?: string | null
    users?: UserCreateNestedManyWithoutGroupInput
    board?: UserCreateNestedManyWithoutGroupBoardInput
    challenge?: ChallengeCreateNestedManyWithoutGroupInput
  }

  export type GroupClubUncheckedCreateInput = {
    groupId: string
    name: string
    pictureURL?: string | null
    users?: UserUncheckedCreateNestedManyWithoutGroupInput
    board?: UserUncheckedCreateNestedManyWithoutGroupBoardInput
    challenge?: ChallengeUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupClubUpdateInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUpdateManyWithoutGroupNestedInput
    board?: UserUpdateManyWithoutGroupBoardNestedInput
    challenge?: ChallengeUpdateManyWithoutGroupNestedInput
  }

  export type GroupClubUncheckedUpdateInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUncheckedUpdateManyWithoutGroupNestedInput
    board?: UserUncheckedUpdateManyWithoutGroupBoardNestedInput
    challenge?: ChallengeUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupClubCreateManyInput = {
    groupId: string
    name: string
    pictureURL?: string | null
  }

  export type GroupClubUpdateManyMutationInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pictureURL?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GroupClubUncheckedUpdateManyInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pictureURL?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GroupInteCreateInput = {
    groupId: string
    name: string
    pictureURL?: string | null
    points?: number
    usersInte?: UserCreateNestedManyWithoutGroupInteInput
    challengeSucceed?: ChallengeCreateNestedManyWithoutGroupInteSucceedInput
  }

  export type GroupInteUncheckedCreateInput = {
    groupId: string
    name: string
    pictureURL?: string | null
    points?: number
    usersInte?: UserUncheckedCreateNestedManyWithoutGroupInteInput
    challengeSucceed?: ChallengeUncheckedCreateNestedManyWithoutGroupInteSucceedInput
  }

  export type GroupInteUpdateInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    usersInte?: UserUpdateManyWithoutGroupInteNestedInput
    challengeSucceed?: ChallengeUpdateManyWithoutGroupInteSucceedNestedInput
  }

  export type GroupInteUncheckedUpdateInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    usersInte?: UserUncheckedUpdateManyWithoutGroupInteNestedInput
    challengeSucceed?: ChallengeUncheckedUpdateManyWithoutGroupInteSucceedNestedInput
  }

  export type GroupInteCreateManyInput = {
    groupId: string
    name: string
    pictureURL?: string | null
    points?: number
  }

  export type GroupInteUpdateManyMutationInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
  }

  export type GroupInteUncheckedUpdateManyInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
  }

  export type ProofCreateInput = {
    proofId?: string
    content: string
    type: $Enums.UploadType
    date: Date | string
    media?: string | null
    text?: string | null
    validatorId?: string | null
    status: $Enums.Status
    user: UserCreateNestedOneWithoutProofInput
    challenge?: ChallengeCreateNestedOneWithoutProofsInput
  }

  export type ProofUncheckedCreateInput = {
    proofId?: string
    userId: string
    content: string
    type: $Enums.UploadType
    date: Date | string
    media?: string | null
    text?: string | null
    challengeId?: number | null
    validatorId?: string | null
    status: $Enums.Status
  }

  export type ProofUpdateInput = {
    proofId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    validatorId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    user?: UserUpdateOneRequiredWithoutProofNestedInput
    challenge?: ChallengeUpdateOneWithoutProofsNestedInput
  }

  export type ProofUncheckedUpdateInput = {
    proofId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    challengeId?: NullableIntFieldUpdateOperationsInput | number | null
    validatorId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
  }

  export type ProofCreateManyInput = {
    proofId?: string
    userId: string
    content: string
    type: $Enums.UploadType
    date: Date | string
    media?: string | null
    text?: string | null
    challengeId?: number | null
    validatorId?: string | null
    status: $Enums.Status
  }

  export type ProofUpdateManyMutationInput = {
    proofId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    validatorId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
  }

  export type ProofUncheckedUpdateManyInput = {
    proofId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    challengeId?: NullableIntFieldUpdateOperationsInput | number | null
    validatorId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
  }

  export type ChallengeCreateInput = {
    name: string
    description?: string | null
    userId: string
    userAcceptId?: string | null
    defiAccepte?: boolean
    type: $Enums.UploadType
    nbPoints?: number
    isDeleted?: boolean
    group: GroupClubCreateNestedOneWithoutChallengeInput
    groupInteSucceed?: GroupInteCreateNestedManyWithoutChallengeSucceedInput
    location?: LocationCreateNestedOneWithoutChallengeInput
    proofs?: ProofCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeUncheckedCreateInput = {
    challengeId?: number
    name: string
    description?: string | null
    groupId: string
    userId: string
    userAcceptId?: string | null
    defiAccepte?: boolean
    type: $Enums.UploadType
    nbPoints?: number
    locationName?: string
    isDeleted?: boolean
    groupInteSucceed?: GroupInteUncheckedCreateNestedManyWithoutChallengeSucceedInput
    proofs?: ProofUncheckedCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    userAcceptId?: NullableStringFieldUpdateOperationsInput | string | null
    defiAccepte?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    nbPoints?: IntFieldUpdateOperationsInput | number
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    group?: GroupClubUpdateOneRequiredWithoutChallengeNestedInput
    groupInteSucceed?: GroupInteUpdateManyWithoutChallengeSucceedNestedInput
    location?: LocationUpdateOneRequiredWithoutChallengeNestedInput
    proofs?: ProofUpdateManyWithoutChallengeNestedInput
  }

  export type ChallengeUncheckedUpdateInput = {
    challengeId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    groupId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userAcceptId?: NullableStringFieldUpdateOperationsInput | string | null
    defiAccepte?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    nbPoints?: IntFieldUpdateOperationsInput | number
    locationName?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    groupInteSucceed?: GroupInteUncheckedUpdateManyWithoutChallengeSucceedNestedInput
    proofs?: ProofUncheckedUpdateManyWithoutChallengeNestedInput
  }

  export type ChallengeCreateManyInput = {
    challengeId?: number
    name: string
    description?: string | null
    groupId: string
    userId: string
    userAcceptId?: string | null
    defiAccepte?: boolean
    type: $Enums.UploadType
    nbPoints?: number
    locationName?: string
    isDeleted?: boolean
  }

  export type ChallengeUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    userAcceptId?: NullableStringFieldUpdateOperationsInput | string | null
    defiAccepte?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    nbPoints?: IntFieldUpdateOperationsInput | number
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ChallengeUncheckedUpdateManyInput = {
    challengeId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    groupId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userAcceptId?: NullableStringFieldUpdateOperationsInput | string | null
    defiAccepte?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    nbPoints?: IntFieldUpdateOperationsInput | number
    locationName?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LocationCreateInput = {
    name: string
    challenge?: ChallengeCreateNestedManyWithoutLocationInput
  }

  export type LocationUncheckedCreateInput = {
    name: string
    challenge?: ChallengeUncheckedCreateNestedManyWithoutLocationInput
  }

  export type LocationUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    challenge?: ChallengeUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    challenge?: ChallengeUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type LocationCreateManyInput = {
    name: string
  }

  export type LocationUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type LocationUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type GroupClubListRelationFilter = {
    every?: GroupClubWhereInput
    some?: GroupClubWhereInput
    none?: GroupClubWhereInput
  }

  export type GroupInteNullableScalarRelationFilter = {
    is?: GroupInteWhereInput | null
    isNot?: GroupInteWhereInput | null
  }

  export type ProofListRelationFilter = {
    every?: ProofWhereInput
    some?: ProofWhereInput
    none?: ProofWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GroupClubOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProofOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    is1A?: SortOrder
    profilePictureURL?: SortOrder
    groupInteId?: SortOrder
    points?: SortOrder
    isAdmin?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    points?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    is1A?: SortOrder
    profilePictureURL?: SortOrder
    groupInteId?: SortOrder
    points?: SortOrder
    isAdmin?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    is1A?: SortOrder
    profilePictureURL?: SortOrder
    groupInteId?: SortOrder
    points?: SortOrder
    isAdmin?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    points?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type ChallengeListRelationFilter = {
    every?: ChallengeWhereInput
    some?: ChallengeWhereInput
    none?: ChallengeWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChallengeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupClubCountOrderByAggregateInput = {
    groupId?: SortOrder
    name?: SortOrder
    pictureURL?: SortOrder
  }

  export type GroupClubMaxOrderByAggregateInput = {
    groupId?: SortOrder
    name?: SortOrder
    pictureURL?: SortOrder
  }

  export type GroupClubMinOrderByAggregateInput = {
    groupId?: SortOrder
    name?: SortOrder
    pictureURL?: SortOrder
  }

  export type GroupInteCountOrderByAggregateInput = {
    groupId?: SortOrder
    name?: SortOrder
    pictureURL?: SortOrder
    points?: SortOrder
  }

  export type GroupInteAvgOrderByAggregateInput = {
    points?: SortOrder
  }

  export type GroupInteMaxOrderByAggregateInput = {
    groupId?: SortOrder
    name?: SortOrder
    pictureURL?: SortOrder
    points?: SortOrder
  }

  export type GroupInteMinOrderByAggregateInput = {
    groupId?: SortOrder
    name?: SortOrder
    pictureURL?: SortOrder
    points?: SortOrder
  }

  export type GroupInteSumOrderByAggregateInput = {
    points?: SortOrder
  }

  export type EnumUploadTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadType | EnumUploadTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UploadType[] | ListEnumUploadTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UploadType[] | ListEnumUploadTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUploadTypeFilter<$PrismaModel> | $Enums.UploadType
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ChallengeNullableScalarRelationFilter = {
    is?: ChallengeWhereInput | null
    isNot?: ChallengeWhereInput | null
  }

  export type ProofCountOrderByAggregateInput = {
    proofId?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    date?: SortOrder
    media?: SortOrder
    text?: SortOrder
    challengeId?: SortOrder
    validatorId?: SortOrder
    status?: SortOrder
  }

  export type ProofAvgOrderByAggregateInput = {
    challengeId?: SortOrder
  }

  export type ProofMaxOrderByAggregateInput = {
    proofId?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    date?: SortOrder
    media?: SortOrder
    text?: SortOrder
    challengeId?: SortOrder
    validatorId?: SortOrder
    status?: SortOrder
  }

  export type ProofMinOrderByAggregateInput = {
    proofId?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    date?: SortOrder
    media?: SortOrder
    text?: SortOrder
    challengeId?: SortOrder
    validatorId?: SortOrder
    status?: SortOrder
  }

  export type ProofSumOrderByAggregateInput = {
    challengeId?: SortOrder
  }

  export type EnumUploadTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadType | EnumUploadTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UploadType[] | ListEnumUploadTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UploadType[] | ListEnumUploadTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUploadTypeWithAggregatesFilter<$PrismaModel> | $Enums.UploadType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUploadTypeFilter<$PrismaModel>
    _max?: NestedEnumUploadTypeFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type GroupClubScalarRelationFilter = {
    is?: GroupClubWhereInput
    isNot?: GroupClubWhereInput
  }

  export type GroupInteListRelationFilter = {
    every?: GroupInteWhereInput
    some?: GroupInteWhereInput
    none?: GroupInteWhereInput
  }

  export type LocationScalarRelationFilter = {
    is?: LocationWhereInput
    isNot?: LocationWhereInput
  }

  export type GroupInteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChallengeCountOrderByAggregateInput = {
    challengeId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    groupId?: SortOrder
    userId?: SortOrder
    userAcceptId?: SortOrder
    defiAccepte?: SortOrder
    type?: SortOrder
    nbPoints?: SortOrder
    locationName?: SortOrder
    isDeleted?: SortOrder
  }

  export type ChallengeAvgOrderByAggregateInput = {
    challengeId?: SortOrder
    nbPoints?: SortOrder
  }

  export type ChallengeMaxOrderByAggregateInput = {
    challengeId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    groupId?: SortOrder
    userId?: SortOrder
    userAcceptId?: SortOrder
    defiAccepte?: SortOrder
    type?: SortOrder
    nbPoints?: SortOrder
    locationName?: SortOrder
    isDeleted?: SortOrder
  }

  export type ChallengeMinOrderByAggregateInput = {
    challengeId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    groupId?: SortOrder
    userId?: SortOrder
    userAcceptId?: SortOrder
    defiAccepte?: SortOrder
    type?: SortOrder
    nbPoints?: SortOrder
    locationName?: SortOrder
    isDeleted?: SortOrder
  }

  export type ChallengeSumOrderByAggregateInput = {
    challengeId?: SortOrder
    nbPoints?: SortOrder
  }

  export type LocationCountOrderByAggregateInput = {
    name?: SortOrder
  }

  export type LocationMaxOrderByAggregateInput = {
    name?: SortOrder
  }

  export type LocationMinOrderByAggregateInput = {
    name?: SortOrder
  }

  export type GroupClubCreateNestedManyWithoutUsersInput = {
    create?: XOR<GroupClubCreateWithoutUsersInput, GroupClubUncheckedCreateWithoutUsersInput> | GroupClubCreateWithoutUsersInput[] | GroupClubUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: GroupClubCreateOrConnectWithoutUsersInput | GroupClubCreateOrConnectWithoutUsersInput[]
    connect?: GroupClubWhereUniqueInput | GroupClubWhereUniqueInput[]
  }

  export type GroupClubCreateNestedManyWithoutBoardInput = {
    create?: XOR<GroupClubCreateWithoutBoardInput, GroupClubUncheckedCreateWithoutBoardInput> | GroupClubCreateWithoutBoardInput[] | GroupClubUncheckedCreateWithoutBoardInput[]
    connectOrCreate?: GroupClubCreateOrConnectWithoutBoardInput | GroupClubCreateOrConnectWithoutBoardInput[]
    connect?: GroupClubWhereUniqueInput | GroupClubWhereUniqueInput[]
  }

  export type GroupInteCreateNestedOneWithoutUsersInteInput = {
    create?: XOR<GroupInteCreateWithoutUsersInteInput, GroupInteUncheckedCreateWithoutUsersInteInput>
    connectOrCreate?: GroupInteCreateOrConnectWithoutUsersInteInput
    connect?: GroupInteWhereUniqueInput
  }

  export type ProofCreateNestedManyWithoutUserInput = {
    create?: XOR<ProofCreateWithoutUserInput, ProofUncheckedCreateWithoutUserInput> | ProofCreateWithoutUserInput[] | ProofUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProofCreateOrConnectWithoutUserInput | ProofCreateOrConnectWithoutUserInput[]
    createMany?: ProofCreateManyUserInputEnvelope
    connect?: ProofWhereUniqueInput | ProofWhereUniqueInput[]
  }

  export type GroupClubUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<GroupClubCreateWithoutUsersInput, GroupClubUncheckedCreateWithoutUsersInput> | GroupClubCreateWithoutUsersInput[] | GroupClubUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: GroupClubCreateOrConnectWithoutUsersInput | GroupClubCreateOrConnectWithoutUsersInput[]
    connect?: GroupClubWhereUniqueInput | GroupClubWhereUniqueInput[]
  }

  export type GroupClubUncheckedCreateNestedManyWithoutBoardInput = {
    create?: XOR<GroupClubCreateWithoutBoardInput, GroupClubUncheckedCreateWithoutBoardInput> | GroupClubCreateWithoutBoardInput[] | GroupClubUncheckedCreateWithoutBoardInput[]
    connectOrCreate?: GroupClubCreateOrConnectWithoutBoardInput | GroupClubCreateOrConnectWithoutBoardInput[]
    connect?: GroupClubWhereUniqueInput | GroupClubWhereUniqueInput[]
  }

  export type ProofUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProofCreateWithoutUserInput, ProofUncheckedCreateWithoutUserInput> | ProofCreateWithoutUserInput[] | ProofUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProofCreateOrConnectWithoutUserInput | ProofCreateOrConnectWithoutUserInput[]
    createMany?: ProofCreateManyUserInputEnvelope
    connect?: ProofWhereUniqueInput | ProofWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GroupClubUpdateManyWithoutUsersNestedInput = {
    create?: XOR<GroupClubCreateWithoutUsersInput, GroupClubUncheckedCreateWithoutUsersInput> | GroupClubCreateWithoutUsersInput[] | GroupClubUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: GroupClubCreateOrConnectWithoutUsersInput | GroupClubCreateOrConnectWithoutUsersInput[]
    upsert?: GroupClubUpsertWithWhereUniqueWithoutUsersInput | GroupClubUpsertWithWhereUniqueWithoutUsersInput[]
    set?: GroupClubWhereUniqueInput | GroupClubWhereUniqueInput[]
    disconnect?: GroupClubWhereUniqueInput | GroupClubWhereUniqueInput[]
    delete?: GroupClubWhereUniqueInput | GroupClubWhereUniqueInput[]
    connect?: GroupClubWhereUniqueInput | GroupClubWhereUniqueInput[]
    update?: GroupClubUpdateWithWhereUniqueWithoutUsersInput | GroupClubUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: GroupClubUpdateManyWithWhereWithoutUsersInput | GroupClubUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: GroupClubScalarWhereInput | GroupClubScalarWhereInput[]
  }

  export type GroupClubUpdateManyWithoutBoardNestedInput = {
    create?: XOR<GroupClubCreateWithoutBoardInput, GroupClubUncheckedCreateWithoutBoardInput> | GroupClubCreateWithoutBoardInput[] | GroupClubUncheckedCreateWithoutBoardInput[]
    connectOrCreate?: GroupClubCreateOrConnectWithoutBoardInput | GroupClubCreateOrConnectWithoutBoardInput[]
    upsert?: GroupClubUpsertWithWhereUniqueWithoutBoardInput | GroupClubUpsertWithWhereUniqueWithoutBoardInput[]
    set?: GroupClubWhereUniqueInput | GroupClubWhereUniqueInput[]
    disconnect?: GroupClubWhereUniqueInput | GroupClubWhereUniqueInput[]
    delete?: GroupClubWhereUniqueInput | GroupClubWhereUniqueInput[]
    connect?: GroupClubWhereUniqueInput | GroupClubWhereUniqueInput[]
    update?: GroupClubUpdateWithWhereUniqueWithoutBoardInput | GroupClubUpdateWithWhereUniqueWithoutBoardInput[]
    updateMany?: GroupClubUpdateManyWithWhereWithoutBoardInput | GroupClubUpdateManyWithWhereWithoutBoardInput[]
    deleteMany?: GroupClubScalarWhereInput | GroupClubScalarWhereInput[]
  }

  export type GroupInteUpdateOneWithoutUsersInteNestedInput = {
    create?: XOR<GroupInteCreateWithoutUsersInteInput, GroupInteUncheckedCreateWithoutUsersInteInput>
    connectOrCreate?: GroupInteCreateOrConnectWithoutUsersInteInput
    upsert?: GroupInteUpsertWithoutUsersInteInput
    disconnect?: GroupInteWhereInput | boolean
    delete?: GroupInteWhereInput | boolean
    connect?: GroupInteWhereUniqueInput
    update?: XOR<XOR<GroupInteUpdateToOneWithWhereWithoutUsersInteInput, GroupInteUpdateWithoutUsersInteInput>, GroupInteUncheckedUpdateWithoutUsersInteInput>
  }

  export type ProofUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProofCreateWithoutUserInput, ProofUncheckedCreateWithoutUserInput> | ProofCreateWithoutUserInput[] | ProofUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProofCreateOrConnectWithoutUserInput | ProofCreateOrConnectWithoutUserInput[]
    upsert?: ProofUpsertWithWhereUniqueWithoutUserInput | ProofUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProofCreateManyUserInputEnvelope
    set?: ProofWhereUniqueInput | ProofWhereUniqueInput[]
    disconnect?: ProofWhereUniqueInput | ProofWhereUniqueInput[]
    delete?: ProofWhereUniqueInput | ProofWhereUniqueInput[]
    connect?: ProofWhereUniqueInput | ProofWhereUniqueInput[]
    update?: ProofUpdateWithWhereUniqueWithoutUserInput | ProofUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProofUpdateManyWithWhereWithoutUserInput | ProofUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProofScalarWhereInput | ProofScalarWhereInput[]
  }

  export type GroupClubUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<GroupClubCreateWithoutUsersInput, GroupClubUncheckedCreateWithoutUsersInput> | GroupClubCreateWithoutUsersInput[] | GroupClubUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: GroupClubCreateOrConnectWithoutUsersInput | GroupClubCreateOrConnectWithoutUsersInput[]
    upsert?: GroupClubUpsertWithWhereUniqueWithoutUsersInput | GroupClubUpsertWithWhereUniqueWithoutUsersInput[]
    set?: GroupClubWhereUniqueInput | GroupClubWhereUniqueInput[]
    disconnect?: GroupClubWhereUniqueInput | GroupClubWhereUniqueInput[]
    delete?: GroupClubWhereUniqueInput | GroupClubWhereUniqueInput[]
    connect?: GroupClubWhereUniqueInput | GroupClubWhereUniqueInput[]
    update?: GroupClubUpdateWithWhereUniqueWithoutUsersInput | GroupClubUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: GroupClubUpdateManyWithWhereWithoutUsersInput | GroupClubUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: GroupClubScalarWhereInput | GroupClubScalarWhereInput[]
  }

  export type GroupClubUncheckedUpdateManyWithoutBoardNestedInput = {
    create?: XOR<GroupClubCreateWithoutBoardInput, GroupClubUncheckedCreateWithoutBoardInput> | GroupClubCreateWithoutBoardInput[] | GroupClubUncheckedCreateWithoutBoardInput[]
    connectOrCreate?: GroupClubCreateOrConnectWithoutBoardInput | GroupClubCreateOrConnectWithoutBoardInput[]
    upsert?: GroupClubUpsertWithWhereUniqueWithoutBoardInput | GroupClubUpsertWithWhereUniqueWithoutBoardInput[]
    set?: GroupClubWhereUniqueInput | GroupClubWhereUniqueInput[]
    disconnect?: GroupClubWhereUniqueInput | GroupClubWhereUniqueInput[]
    delete?: GroupClubWhereUniqueInput | GroupClubWhereUniqueInput[]
    connect?: GroupClubWhereUniqueInput | GroupClubWhereUniqueInput[]
    update?: GroupClubUpdateWithWhereUniqueWithoutBoardInput | GroupClubUpdateWithWhereUniqueWithoutBoardInput[]
    updateMany?: GroupClubUpdateManyWithWhereWithoutBoardInput | GroupClubUpdateManyWithWhereWithoutBoardInput[]
    deleteMany?: GroupClubScalarWhereInput | GroupClubScalarWhereInput[]
  }

  export type ProofUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProofCreateWithoutUserInput, ProofUncheckedCreateWithoutUserInput> | ProofCreateWithoutUserInput[] | ProofUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProofCreateOrConnectWithoutUserInput | ProofCreateOrConnectWithoutUserInput[]
    upsert?: ProofUpsertWithWhereUniqueWithoutUserInput | ProofUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProofCreateManyUserInputEnvelope
    set?: ProofWhereUniqueInput | ProofWhereUniqueInput[]
    disconnect?: ProofWhereUniqueInput | ProofWhereUniqueInput[]
    delete?: ProofWhereUniqueInput | ProofWhereUniqueInput[]
    connect?: ProofWhereUniqueInput | ProofWhereUniqueInput[]
    update?: ProofUpdateWithWhereUniqueWithoutUserInput | ProofUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProofUpdateManyWithWhereWithoutUserInput | ProofUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProofScalarWhereInput | ProofScalarWhereInput[]
  }

  export type UserCreateNestedManyWithoutGroupInput = {
    create?: XOR<UserCreateWithoutGroupInput, UserUncheckedCreateWithoutGroupInput> | UserCreateWithoutGroupInput[] | UserUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserCreateOrConnectWithoutGroupInput | UserCreateOrConnectWithoutGroupInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutGroupBoardInput = {
    create?: XOR<UserCreateWithoutGroupBoardInput, UserUncheckedCreateWithoutGroupBoardInput> | UserCreateWithoutGroupBoardInput[] | UserUncheckedCreateWithoutGroupBoardInput[]
    connectOrCreate?: UserCreateOrConnectWithoutGroupBoardInput | UserCreateOrConnectWithoutGroupBoardInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ChallengeCreateNestedManyWithoutGroupInput = {
    create?: XOR<ChallengeCreateWithoutGroupInput, ChallengeUncheckedCreateWithoutGroupInput> | ChallengeCreateWithoutGroupInput[] | ChallengeUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: ChallengeCreateOrConnectWithoutGroupInput | ChallengeCreateOrConnectWithoutGroupInput[]
    createMany?: ChallengeCreateManyGroupInputEnvelope
    connect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<UserCreateWithoutGroupInput, UserUncheckedCreateWithoutGroupInput> | UserCreateWithoutGroupInput[] | UserUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserCreateOrConnectWithoutGroupInput | UserCreateOrConnectWithoutGroupInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutGroupBoardInput = {
    create?: XOR<UserCreateWithoutGroupBoardInput, UserUncheckedCreateWithoutGroupBoardInput> | UserCreateWithoutGroupBoardInput[] | UserUncheckedCreateWithoutGroupBoardInput[]
    connectOrCreate?: UserCreateOrConnectWithoutGroupBoardInput | UserCreateOrConnectWithoutGroupBoardInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ChallengeUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<ChallengeCreateWithoutGroupInput, ChallengeUncheckedCreateWithoutGroupInput> | ChallengeCreateWithoutGroupInput[] | ChallengeUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: ChallengeCreateOrConnectWithoutGroupInput | ChallengeCreateOrConnectWithoutGroupInput[]
    createMany?: ChallengeCreateManyGroupInputEnvelope
    connect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
  }

  export type UserUpdateManyWithoutGroupNestedInput = {
    create?: XOR<UserCreateWithoutGroupInput, UserUncheckedCreateWithoutGroupInput> | UserCreateWithoutGroupInput[] | UserUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserCreateOrConnectWithoutGroupInput | UserCreateOrConnectWithoutGroupInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutGroupInput | UserUpsertWithWhereUniqueWithoutGroupInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutGroupInput | UserUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: UserUpdateManyWithWhereWithoutGroupInput | UserUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUpdateManyWithoutGroupBoardNestedInput = {
    create?: XOR<UserCreateWithoutGroupBoardInput, UserUncheckedCreateWithoutGroupBoardInput> | UserCreateWithoutGroupBoardInput[] | UserUncheckedCreateWithoutGroupBoardInput[]
    connectOrCreate?: UserCreateOrConnectWithoutGroupBoardInput | UserCreateOrConnectWithoutGroupBoardInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutGroupBoardInput | UserUpsertWithWhereUniqueWithoutGroupBoardInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutGroupBoardInput | UserUpdateWithWhereUniqueWithoutGroupBoardInput[]
    updateMany?: UserUpdateManyWithWhereWithoutGroupBoardInput | UserUpdateManyWithWhereWithoutGroupBoardInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ChallengeUpdateManyWithoutGroupNestedInput = {
    create?: XOR<ChallengeCreateWithoutGroupInput, ChallengeUncheckedCreateWithoutGroupInput> | ChallengeCreateWithoutGroupInput[] | ChallengeUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: ChallengeCreateOrConnectWithoutGroupInput | ChallengeCreateOrConnectWithoutGroupInput[]
    upsert?: ChallengeUpsertWithWhereUniqueWithoutGroupInput | ChallengeUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: ChallengeCreateManyGroupInputEnvelope
    set?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    disconnect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    delete?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    connect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    update?: ChallengeUpdateWithWhereUniqueWithoutGroupInput | ChallengeUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: ChallengeUpdateManyWithWhereWithoutGroupInput | ChallengeUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: ChallengeScalarWhereInput | ChallengeScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<UserCreateWithoutGroupInput, UserUncheckedCreateWithoutGroupInput> | UserCreateWithoutGroupInput[] | UserUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserCreateOrConnectWithoutGroupInput | UserCreateOrConnectWithoutGroupInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutGroupInput | UserUpsertWithWhereUniqueWithoutGroupInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutGroupInput | UserUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: UserUpdateManyWithWhereWithoutGroupInput | UserUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutGroupBoardNestedInput = {
    create?: XOR<UserCreateWithoutGroupBoardInput, UserUncheckedCreateWithoutGroupBoardInput> | UserCreateWithoutGroupBoardInput[] | UserUncheckedCreateWithoutGroupBoardInput[]
    connectOrCreate?: UserCreateOrConnectWithoutGroupBoardInput | UserCreateOrConnectWithoutGroupBoardInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutGroupBoardInput | UserUpsertWithWhereUniqueWithoutGroupBoardInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutGroupBoardInput | UserUpdateWithWhereUniqueWithoutGroupBoardInput[]
    updateMany?: UserUpdateManyWithWhereWithoutGroupBoardInput | UserUpdateManyWithWhereWithoutGroupBoardInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ChallengeUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<ChallengeCreateWithoutGroupInput, ChallengeUncheckedCreateWithoutGroupInput> | ChallengeCreateWithoutGroupInput[] | ChallengeUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: ChallengeCreateOrConnectWithoutGroupInput | ChallengeCreateOrConnectWithoutGroupInput[]
    upsert?: ChallengeUpsertWithWhereUniqueWithoutGroupInput | ChallengeUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: ChallengeCreateManyGroupInputEnvelope
    set?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    disconnect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    delete?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    connect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    update?: ChallengeUpdateWithWhereUniqueWithoutGroupInput | ChallengeUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: ChallengeUpdateManyWithWhereWithoutGroupInput | ChallengeUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: ChallengeScalarWhereInput | ChallengeScalarWhereInput[]
  }

  export type UserCreateNestedManyWithoutGroupInteInput = {
    create?: XOR<UserCreateWithoutGroupInteInput, UserUncheckedCreateWithoutGroupInteInput> | UserCreateWithoutGroupInteInput[] | UserUncheckedCreateWithoutGroupInteInput[]
    connectOrCreate?: UserCreateOrConnectWithoutGroupInteInput | UserCreateOrConnectWithoutGroupInteInput[]
    createMany?: UserCreateManyGroupInteInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ChallengeCreateNestedManyWithoutGroupInteSucceedInput = {
    create?: XOR<ChallengeCreateWithoutGroupInteSucceedInput, ChallengeUncheckedCreateWithoutGroupInteSucceedInput> | ChallengeCreateWithoutGroupInteSucceedInput[] | ChallengeUncheckedCreateWithoutGroupInteSucceedInput[]
    connectOrCreate?: ChallengeCreateOrConnectWithoutGroupInteSucceedInput | ChallengeCreateOrConnectWithoutGroupInteSucceedInput[]
    connect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutGroupInteInput = {
    create?: XOR<UserCreateWithoutGroupInteInput, UserUncheckedCreateWithoutGroupInteInput> | UserCreateWithoutGroupInteInput[] | UserUncheckedCreateWithoutGroupInteInput[]
    connectOrCreate?: UserCreateOrConnectWithoutGroupInteInput | UserCreateOrConnectWithoutGroupInteInput[]
    createMany?: UserCreateManyGroupInteInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ChallengeUncheckedCreateNestedManyWithoutGroupInteSucceedInput = {
    create?: XOR<ChallengeCreateWithoutGroupInteSucceedInput, ChallengeUncheckedCreateWithoutGroupInteSucceedInput> | ChallengeCreateWithoutGroupInteSucceedInput[] | ChallengeUncheckedCreateWithoutGroupInteSucceedInput[]
    connectOrCreate?: ChallengeCreateOrConnectWithoutGroupInteSucceedInput | ChallengeCreateOrConnectWithoutGroupInteSucceedInput[]
    connect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
  }

  export type UserUpdateManyWithoutGroupInteNestedInput = {
    create?: XOR<UserCreateWithoutGroupInteInput, UserUncheckedCreateWithoutGroupInteInput> | UserCreateWithoutGroupInteInput[] | UserUncheckedCreateWithoutGroupInteInput[]
    connectOrCreate?: UserCreateOrConnectWithoutGroupInteInput | UserCreateOrConnectWithoutGroupInteInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutGroupInteInput | UserUpsertWithWhereUniqueWithoutGroupInteInput[]
    createMany?: UserCreateManyGroupInteInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutGroupInteInput | UserUpdateWithWhereUniqueWithoutGroupInteInput[]
    updateMany?: UserUpdateManyWithWhereWithoutGroupInteInput | UserUpdateManyWithWhereWithoutGroupInteInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ChallengeUpdateManyWithoutGroupInteSucceedNestedInput = {
    create?: XOR<ChallengeCreateWithoutGroupInteSucceedInput, ChallengeUncheckedCreateWithoutGroupInteSucceedInput> | ChallengeCreateWithoutGroupInteSucceedInput[] | ChallengeUncheckedCreateWithoutGroupInteSucceedInput[]
    connectOrCreate?: ChallengeCreateOrConnectWithoutGroupInteSucceedInput | ChallengeCreateOrConnectWithoutGroupInteSucceedInput[]
    upsert?: ChallengeUpsertWithWhereUniqueWithoutGroupInteSucceedInput | ChallengeUpsertWithWhereUniqueWithoutGroupInteSucceedInput[]
    set?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    disconnect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    delete?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    connect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    update?: ChallengeUpdateWithWhereUniqueWithoutGroupInteSucceedInput | ChallengeUpdateWithWhereUniqueWithoutGroupInteSucceedInput[]
    updateMany?: ChallengeUpdateManyWithWhereWithoutGroupInteSucceedInput | ChallengeUpdateManyWithWhereWithoutGroupInteSucceedInput[]
    deleteMany?: ChallengeScalarWhereInput | ChallengeScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutGroupInteNestedInput = {
    create?: XOR<UserCreateWithoutGroupInteInput, UserUncheckedCreateWithoutGroupInteInput> | UserCreateWithoutGroupInteInput[] | UserUncheckedCreateWithoutGroupInteInput[]
    connectOrCreate?: UserCreateOrConnectWithoutGroupInteInput | UserCreateOrConnectWithoutGroupInteInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutGroupInteInput | UserUpsertWithWhereUniqueWithoutGroupInteInput[]
    createMany?: UserCreateManyGroupInteInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutGroupInteInput | UserUpdateWithWhereUniqueWithoutGroupInteInput[]
    updateMany?: UserUpdateManyWithWhereWithoutGroupInteInput | UserUpdateManyWithWhereWithoutGroupInteInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ChallengeUncheckedUpdateManyWithoutGroupInteSucceedNestedInput = {
    create?: XOR<ChallengeCreateWithoutGroupInteSucceedInput, ChallengeUncheckedCreateWithoutGroupInteSucceedInput> | ChallengeCreateWithoutGroupInteSucceedInput[] | ChallengeUncheckedCreateWithoutGroupInteSucceedInput[]
    connectOrCreate?: ChallengeCreateOrConnectWithoutGroupInteSucceedInput | ChallengeCreateOrConnectWithoutGroupInteSucceedInput[]
    upsert?: ChallengeUpsertWithWhereUniqueWithoutGroupInteSucceedInput | ChallengeUpsertWithWhereUniqueWithoutGroupInteSucceedInput[]
    set?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    disconnect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    delete?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    connect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    update?: ChallengeUpdateWithWhereUniqueWithoutGroupInteSucceedInput | ChallengeUpdateWithWhereUniqueWithoutGroupInteSucceedInput[]
    updateMany?: ChallengeUpdateManyWithWhereWithoutGroupInteSucceedInput | ChallengeUpdateManyWithWhereWithoutGroupInteSucceedInput[]
    deleteMany?: ChallengeScalarWhereInput | ChallengeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProofInput = {
    create?: XOR<UserCreateWithoutProofInput, UserUncheckedCreateWithoutProofInput>
    connectOrCreate?: UserCreateOrConnectWithoutProofInput
    connect?: UserWhereUniqueInput
  }

  export type ChallengeCreateNestedOneWithoutProofsInput = {
    create?: XOR<ChallengeCreateWithoutProofsInput, ChallengeUncheckedCreateWithoutProofsInput>
    connectOrCreate?: ChallengeCreateOrConnectWithoutProofsInput
    connect?: ChallengeWhereUniqueInput
  }

  export type EnumUploadTypeFieldUpdateOperationsInput = {
    set?: $Enums.UploadType
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumStatusFieldUpdateOperationsInput = {
    set?: $Enums.Status
  }

  export type UserUpdateOneRequiredWithoutProofNestedInput = {
    create?: XOR<UserCreateWithoutProofInput, UserUncheckedCreateWithoutProofInput>
    connectOrCreate?: UserCreateOrConnectWithoutProofInput
    upsert?: UserUpsertWithoutProofInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProofInput, UserUpdateWithoutProofInput>, UserUncheckedUpdateWithoutProofInput>
  }

  export type ChallengeUpdateOneWithoutProofsNestedInput = {
    create?: XOR<ChallengeCreateWithoutProofsInput, ChallengeUncheckedCreateWithoutProofsInput>
    connectOrCreate?: ChallengeCreateOrConnectWithoutProofsInput
    upsert?: ChallengeUpsertWithoutProofsInput
    disconnect?: ChallengeWhereInput | boolean
    delete?: ChallengeWhereInput | boolean
    connect?: ChallengeWhereUniqueInput
    update?: XOR<XOR<ChallengeUpdateToOneWithWhereWithoutProofsInput, ChallengeUpdateWithoutProofsInput>, ChallengeUncheckedUpdateWithoutProofsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GroupClubCreateNestedOneWithoutChallengeInput = {
    create?: XOR<GroupClubCreateWithoutChallengeInput, GroupClubUncheckedCreateWithoutChallengeInput>
    connectOrCreate?: GroupClubCreateOrConnectWithoutChallengeInput
    connect?: GroupClubWhereUniqueInput
  }

  export type GroupInteCreateNestedManyWithoutChallengeSucceedInput = {
    create?: XOR<GroupInteCreateWithoutChallengeSucceedInput, GroupInteUncheckedCreateWithoutChallengeSucceedInput> | GroupInteCreateWithoutChallengeSucceedInput[] | GroupInteUncheckedCreateWithoutChallengeSucceedInput[]
    connectOrCreate?: GroupInteCreateOrConnectWithoutChallengeSucceedInput | GroupInteCreateOrConnectWithoutChallengeSucceedInput[]
    connect?: GroupInteWhereUniqueInput | GroupInteWhereUniqueInput[]
  }

  export type LocationCreateNestedOneWithoutChallengeInput = {
    create?: XOR<LocationCreateWithoutChallengeInput, LocationUncheckedCreateWithoutChallengeInput>
    connectOrCreate?: LocationCreateOrConnectWithoutChallengeInput
    connect?: LocationWhereUniqueInput
  }

  export type ProofCreateNestedManyWithoutChallengeInput = {
    create?: XOR<ProofCreateWithoutChallengeInput, ProofUncheckedCreateWithoutChallengeInput> | ProofCreateWithoutChallengeInput[] | ProofUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: ProofCreateOrConnectWithoutChallengeInput | ProofCreateOrConnectWithoutChallengeInput[]
    createMany?: ProofCreateManyChallengeInputEnvelope
    connect?: ProofWhereUniqueInput | ProofWhereUniqueInput[]
  }

  export type GroupInteUncheckedCreateNestedManyWithoutChallengeSucceedInput = {
    create?: XOR<GroupInteCreateWithoutChallengeSucceedInput, GroupInteUncheckedCreateWithoutChallengeSucceedInput> | GroupInteCreateWithoutChallengeSucceedInput[] | GroupInteUncheckedCreateWithoutChallengeSucceedInput[]
    connectOrCreate?: GroupInteCreateOrConnectWithoutChallengeSucceedInput | GroupInteCreateOrConnectWithoutChallengeSucceedInput[]
    connect?: GroupInteWhereUniqueInput | GroupInteWhereUniqueInput[]
  }

  export type ProofUncheckedCreateNestedManyWithoutChallengeInput = {
    create?: XOR<ProofCreateWithoutChallengeInput, ProofUncheckedCreateWithoutChallengeInput> | ProofCreateWithoutChallengeInput[] | ProofUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: ProofCreateOrConnectWithoutChallengeInput | ProofCreateOrConnectWithoutChallengeInput[]
    createMany?: ProofCreateManyChallengeInputEnvelope
    connect?: ProofWhereUniqueInput | ProofWhereUniqueInput[]
  }

  export type GroupClubUpdateOneRequiredWithoutChallengeNestedInput = {
    create?: XOR<GroupClubCreateWithoutChallengeInput, GroupClubUncheckedCreateWithoutChallengeInput>
    connectOrCreate?: GroupClubCreateOrConnectWithoutChallengeInput
    upsert?: GroupClubUpsertWithoutChallengeInput
    connect?: GroupClubWhereUniqueInput
    update?: XOR<XOR<GroupClubUpdateToOneWithWhereWithoutChallengeInput, GroupClubUpdateWithoutChallengeInput>, GroupClubUncheckedUpdateWithoutChallengeInput>
  }

  export type GroupInteUpdateManyWithoutChallengeSucceedNestedInput = {
    create?: XOR<GroupInteCreateWithoutChallengeSucceedInput, GroupInteUncheckedCreateWithoutChallengeSucceedInput> | GroupInteCreateWithoutChallengeSucceedInput[] | GroupInteUncheckedCreateWithoutChallengeSucceedInput[]
    connectOrCreate?: GroupInteCreateOrConnectWithoutChallengeSucceedInput | GroupInteCreateOrConnectWithoutChallengeSucceedInput[]
    upsert?: GroupInteUpsertWithWhereUniqueWithoutChallengeSucceedInput | GroupInteUpsertWithWhereUniqueWithoutChallengeSucceedInput[]
    set?: GroupInteWhereUniqueInput | GroupInteWhereUniqueInput[]
    disconnect?: GroupInteWhereUniqueInput | GroupInteWhereUniqueInput[]
    delete?: GroupInteWhereUniqueInput | GroupInteWhereUniqueInput[]
    connect?: GroupInteWhereUniqueInput | GroupInteWhereUniqueInput[]
    update?: GroupInteUpdateWithWhereUniqueWithoutChallengeSucceedInput | GroupInteUpdateWithWhereUniqueWithoutChallengeSucceedInput[]
    updateMany?: GroupInteUpdateManyWithWhereWithoutChallengeSucceedInput | GroupInteUpdateManyWithWhereWithoutChallengeSucceedInput[]
    deleteMany?: GroupInteScalarWhereInput | GroupInteScalarWhereInput[]
  }

  export type LocationUpdateOneRequiredWithoutChallengeNestedInput = {
    create?: XOR<LocationCreateWithoutChallengeInput, LocationUncheckedCreateWithoutChallengeInput>
    connectOrCreate?: LocationCreateOrConnectWithoutChallengeInput
    upsert?: LocationUpsertWithoutChallengeInput
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutChallengeInput, LocationUpdateWithoutChallengeInput>, LocationUncheckedUpdateWithoutChallengeInput>
  }

  export type ProofUpdateManyWithoutChallengeNestedInput = {
    create?: XOR<ProofCreateWithoutChallengeInput, ProofUncheckedCreateWithoutChallengeInput> | ProofCreateWithoutChallengeInput[] | ProofUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: ProofCreateOrConnectWithoutChallengeInput | ProofCreateOrConnectWithoutChallengeInput[]
    upsert?: ProofUpsertWithWhereUniqueWithoutChallengeInput | ProofUpsertWithWhereUniqueWithoutChallengeInput[]
    createMany?: ProofCreateManyChallengeInputEnvelope
    set?: ProofWhereUniqueInput | ProofWhereUniqueInput[]
    disconnect?: ProofWhereUniqueInput | ProofWhereUniqueInput[]
    delete?: ProofWhereUniqueInput | ProofWhereUniqueInput[]
    connect?: ProofWhereUniqueInput | ProofWhereUniqueInput[]
    update?: ProofUpdateWithWhereUniqueWithoutChallengeInput | ProofUpdateWithWhereUniqueWithoutChallengeInput[]
    updateMany?: ProofUpdateManyWithWhereWithoutChallengeInput | ProofUpdateManyWithWhereWithoutChallengeInput[]
    deleteMany?: ProofScalarWhereInput | ProofScalarWhereInput[]
  }

  export type GroupInteUncheckedUpdateManyWithoutChallengeSucceedNestedInput = {
    create?: XOR<GroupInteCreateWithoutChallengeSucceedInput, GroupInteUncheckedCreateWithoutChallengeSucceedInput> | GroupInteCreateWithoutChallengeSucceedInput[] | GroupInteUncheckedCreateWithoutChallengeSucceedInput[]
    connectOrCreate?: GroupInteCreateOrConnectWithoutChallengeSucceedInput | GroupInteCreateOrConnectWithoutChallengeSucceedInput[]
    upsert?: GroupInteUpsertWithWhereUniqueWithoutChallengeSucceedInput | GroupInteUpsertWithWhereUniqueWithoutChallengeSucceedInput[]
    set?: GroupInteWhereUniqueInput | GroupInteWhereUniqueInput[]
    disconnect?: GroupInteWhereUniqueInput | GroupInteWhereUniqueInput[]
    delete?: GroupInteWhereUniqueInput | GroupInteWhereUniqueInput[]
    connect?: GroupInteWhereUniqueInput | GroupInteWhereUniqueInput[]
    update?: GroupInteUpdateWithWhereUniqueWithoutChallengeSucceedInput | GroupInteUpdateWithWhereUniqueWithoutChallengeSucceedInput[]
    updateMany?: GroupInteUpdateManyWithWhereWithoutChallengeSucceedInput | GroupInteUpdateManyWithWhereWithoutChallengeSucceedInput[]
    deleteMany?: GroupInteScalarWhereInput | GroupInteScalarWhereInput[]
  }

  export type ProofUncheckedUpdateManyWithoutChallengeNestedInput = {
    create?: XOR<ProofCreateWithoutChallengeInput, ProofUncheckedCreateWithoutChallengeInput> | ProofCreateWithoutChallengeInput[] | ProofUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: ProofCreateOrConnectWithoutChallengeInput | ProofCreateOrConnectWithoutChallengeInput[]
    upsert?: ProofUpsertWithWhereUniqueWithoutChallengeInput | ProofUpsertWithWhereUniqueWithoutChallengeInput[]
    createMany?: ProofCreateManyChallengeInputEnvelope
    set?: ProofWhereUniqueInput | ProofWhereUniqueInput[]
    disconnect?: ProofWhereUniqueInput | ProofWhereUniqueInput[]
    delete?: ProofWhereUniqueInput | ProofWhereUniqueInput[]
    connect?: ProofWhereUniqueInput | ProofWhereUniqueInput[]
    update?: ProofUpdateWithWhereUniqueWithoutChallengeInput | ProofUpdateWithWhereUniqueWithoutChallengeInput[]
    updateMany?: ProofUpdateManyWithWhereWithoutChallengeInput | ProofUpdateManyWithWhereWithoutChallengeInput[]
    deleteMany?: ProofScalarWhereInput | ProofScalarWhereInput[]
  }

  export type ChallengeCreateNestedManyWithoutLocationInput = {
    create?: XOR<ChallengeCreateWithoutLocationInput, ChallengeUncheckedCreateWithoutLocationInput> | ChallengeCreateWithoutLocationInput[] | ChallengeUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: ChallengeCreateOrConnectWithoutLocationInput | ChallengeCreateOrConnectWithoutLocationInput[]
    createMany?: ChallengeCreateManyLocationInputEnvelope
    connect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
  }

  export type ChallengeUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<ChallengeCreateWithoutLocationInput, ChallengeUncheckedCreateWithoutLocationInput> | ChallengeCreateWithoutLocationInput[] | ChallengeUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: ChallengeCreateOrConnectWithoutLocationInput | ChallengeCreateOrConnectWithoutLocationInput[]
    createMany?: ChallengeCreateManyLocationInputEnvelope
    connect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
  }

  export type ChallengeUpdateManyWithoutLocationNestedInput = {
    create?: XOR<ChallengeCreateWithoutLocationInput, ChallengeUncheckedCreateWithoutLocationInput> | ChallengeCreateWithoutLocationInput[] | ChallengeUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: ChallengeCreateOrConnectWithoutLocationInput | ChallengeCreateOrConnectWithoutLocationInput[]
    upsert?: ChallengeUpsertWithWhereUniqueWithoutLocationInput | ChallengeUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: ChallengeCreateManyLocationInputEnvelope
    set?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    disconnect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    delete?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    connect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    update?: ChallengeUpdateWithWhereUniqueWithoutLocationInput | ChallengeUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: ChallengeUpdateManyWithWhereWithoutLocationInput | ChallengeUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: ChallengeScalarWhereInput | ChallengeScalarWhereInput[]
  }

  export type ChallengeUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<ChallengeCreateWithoutLocationInput, ChallengeUncheckedCreateWithoutLocationInput> | ChallengeCreateWithoutLocationInput[] | ChallengeUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: ChallengeCreateOrConnectWithoutLocationInput | ChallengeCreateOrConnectWithoutLocationInput[]
    upsert?: ChallengeUpsertWithWhereUniqueWithoutLocationInput | ChallengeUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: ChallengeCreateManyLocationInputEnvelope
    set?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    disconnect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    delete?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    connect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    update?: ChallengeUpdateWithWhereUniqueWithoutLocationInput | ChallengeUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: ChallengeUpdateManyWithWhereWithoutLocationInput | ChallengeUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: ChallengeScalarWhereInput | ChallengeScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumUploadTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadType | EnumUploadTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UploadType[] | ListEnumUploadTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UploadType[] | ListEnumUploadTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUploadTypeFilter<$PrismaModel> | $Enums.UploadType
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type NestedEnumUploadTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadType | EnumUploadTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UploadType[] | ListEnumUploadTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UploadType[] | ListEnumUploadTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUploadTypeWithAggregatesFilter<$PrismaModel> | $Enums.UploadType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUploadTypeFilter<$PrismaModel>
    _max?: NestedEnumUploadTypeFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type GroupClubCreateWithoutUsersInput = {
    groupId: string
    name: string
    pictureURL?: string | null
    board?: UserCreateNestedManyWithoutGroupBoardInput
    challenge?: ChallengeCreateNestedManyWithoutGroupInput
  }

  export type GroupClubUncheckedCreateWithoutUsersInput = {
    groupId: string
    name: string
    pictureURL?: string | null
    board?: UserUncheckedCreateNestedManyWithoutGroupBoardInput
    challenge?: ChallengeUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupClubCreateOrConnectWithoutUsersInput = {
    where: GroupClubWhereUniqueInput
    create: XOR<GroupClubCreateWithoutUsersInput, GroupClubUncheckedCreateWithoutUsersInput>
  }

  export type GroupClubCreateWithoutBoardInput = {
    groupId: string
    name: string
    pictureURL?: string | null
    users?: UserCreateNestedManyWithoutGroupInput
    challenge?: ChallengeCreateNestedManyWithoutGroupInput
  }

  export type GroupClubUncheckedCreateWithoutBoardInput = {
    groupId: string
    name: string
    pictureURL?: string | null
    users?: UserUncheckedCreateNestedManyWithoutGroupInput
    challenge?: ChallengeUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupClubCreateOrConnectWithoutBoardInput = {
    where: GroupClubWhereUniqueInput
    create: XOR<GroupClubCreateWithoutBoardInput, GroupClubUncheckedCreateWithoutBoardInput>
  }

  export type GroupInteCreateWithoutUsersInteInput = {
    groupId: string
    name: string
    pictureURL?: string | null
    points?: number
    challengeSucceed?: ChallengeCreateNestedManyWithoutGroupInteSucceedInput
  }

  export type GroupInteUncheckedCreateWithoutUsersInteInput = {
    groupId: string
    name: string
    pictureURL?: string | null
    points?: number
    challengeSucceed?: ChallengeUncheckedCreateNestedManyWithoutGroupInteSucceedInput
  }

  export type GroupInteCreateOrConnectWithoutUsersInteInput = {
    where: GroupInteWhereUniqueInput
    create: XOR<GroupInteCreateWithoutUsersInteInput, GroupInteUncheckedCreateWithoutUsersInteInput>
  }

  export type ProofCreateWithoutUserInput = {
    proofId?: string
    content: string
    type: $Enums.UploadType
    date: Date | string
    media?: string | null
    text?: string | null
    validatorId?: string | null
    status: $Enums.Status
    challenge?: ChallengeCreateNestedOneWithoutProofsInput
  }

  export type ProofUncheckedCreateWithoutUserInput = {
    proofId?: string
    content: string
    type: $Enums.UploadType
    date: Date | string
    media?: string | null
    text?: string | null
    challengeId?: number | null
    validatorId?: string | null
    status: $Enums.Status
  }

  export type ProofCreateOrConnectWithoutUserInput = {
    where: ProofWhereUniqueInput
    create: XOR<ProofCreateWithoutUserInput, ProofUncheckedCreateWithoutUserInput>
  }

  export type ProofCreateManyUserInputEnvelope = {
    data: ProofCreateManyUserInput | ProofCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GroupClubUpsertWithWhereUniqueWithoutUsersInput = {
    where: GroupClubWhereUniqueInput
    update: XOR<GroupClubUpdateWithoutUsersInput, GroupClubUncheckedUpdateWithoutUsersInput>
    create: XOR<GroupClubCreateWithoutUsersInput, GroupClubUncheckedCreateWithoutUsersInput>
  }

  export type GroupClubUpdateWithWhereUniqueWithoutUsersInput = {
    where: GroupClubWhereUniqueInput
    data: XOR<GroupClubUpdateWithoutUsersInput, GroupClubUncheckedUpdateWithoutUsersInput>
  }

  export type GroupClubUpdateManyWithWhereWithoutUsersInput = {
    where: GroupClubScalarWhereInput
    data: XOR<GroupClubUpdateManyMutationInput, GroupClubUncheckedUpdateManyWithoutUsersInput>
  }

  export type GroupClubScalarWhereInput = {
    AND?: GroupClubScalarWhereInput | GroupClubScalarWhereInput[]
    OR?: GroupClubScalarWhereInput[]
    NOT?: GroupClubScalarWhereInput | GroupClubScalarWhereInput[]
    groupId?: StringFilter<"GroupClub"> | string
    name?: StringFilter<"GroupClub"> | string
    pictureURL?: StringNullableFilter<"GroupClub"> | string | null
  }

  export type GroupClubUpsertWithWhereUniqueWithoutBoardInput = {
    where: GroupClubWhereUniqueInput
    update: XOR<GroupClubUpdateWithoutBoardInput, GroupClubUncheckedUpdateWithoutBoardInput>
    create: XOR<GroupClubCreateWithoutBoardInput, GroupClubUncheckedCreateWithoutBoardInput>
  }

  export type GroupClubUpdateWithWhereUniqueWithoutBoardInput = {
    where: GroupClubWhereUniqueInput
    data: XOR<GroupClubUpdateWithoutBoardInput, GroupClubUncheckedUpdateWithoutBoardInput>
  }

  export type GroupClubUpdateManyWithWhereWithoutBoardInput = {
    where: GroupClubScalarWhereInput
    data: XOR<GroupClubUpdateManyMutationInput, GroupClubUncheckedUpdateManyWithoutBoardInput>
  }

  export type GroupInteUpsertWithoutUsersInteInput = {
    update: XOR<GroupInteUpdateWithoutUsersInteInput, GroupInteUncheckedUpdateWithoutUsersInteInput>
    create: XOR<GroupInteCreateWithoutUsersInteInput, GroupInteUncheckedCreateWithoutUsersInteInput>
    where?: GroupInteWhereInput
  }

  export type GroupInteUpdateToOneWithWhereWithoutUsersInteInput = {
    where?: GroupInteWhereInput
    data: XOR<GroupInteUpdateWithoutUsersInteInput, GroupInteUncheckedUpdateWithoutUsersInteInput>
  }

  export type GroupInteUpdateWithoutUsersInteInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    challengeSucceed?: ChallengeUpdateManyWithoutGroupInteSucceedNestedInput
  }

  export type GroupInteUncheckedUpdateWithoutUsersInteInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    challengeSucceed?: ChallengeUncheckedUpdateManyWithoutGroupInteSucceedNestedInput
  }

  export type ProofUpsertWithWhereUniqueWithoutUserInput = {
    where: ProofWhereUniqueInput
    update: XOR<ProofUpdateWithoutUserInput, ProofUncheckedUpdateWithoutUserInput>
    create: XOR<ProofCreateWithoutUserInput, ProofUncheckedCreateWithoutUserInput>
  }

  export type ProofUpdateWithWhereUniqueWithoutUserInput = {
    where: ProofWhereUniqueInput
    data: XOR<ProofUpdateWithoutUserInput, ProofUncheckedUpdateWithoutUserInput>
  }

  export type ProofUpdateManyWithWhereWithoutUserInput = {
    where: ProofScalarWhereInput
    data: XOR<ProofUpdateManyMutationInput, ProofUncheckedUpdateManyWithoutUserInput>
  }

  export type ProofScalarWhereInput = {
    AND?: ProofScalarWhereInput | ProofScalarWhereInput[]
    OR?: ProofScalarWhereInput[]
    NOT?: ProofScalarWhereInput | ProofScalarWhereInput[]
    proofId?: StringFilter<"Proof"> | string
    userId?: StringFilter<"Proof"> | string
    content?: StringFilter<"Proof"> | string
    type?: EnumUploadTypeFilter<"Proof"> | $Enums.UploadType
    date?: DateTimeFilter<"Proof"> | Date | string
    media?: StringNullableFilter<"Proof"> | string | null
    text?: StringNullableFilter<"Proof"> | string | null
    challengeId?: IntNullableFilter<"Proof"> | number | null
    validatorId?: StringNullableFilter<"Proof"> | string | null
    status?: EnumStatusFilter<"Proof"> | $Enums.Status
  }

  export type UserCreateWithoutGroupInput = {
    id?: string
    name: string
    is1A: boolean
    profilePictureURL?: string | null
    points?: number
    isAdmin?: boolean
    groupBoard?: GroupClubCreateNestedManyWithoutBoardInput
    groupInte?: GroupInteCreateNestedOneWithoutUsersInteInput
    proof?: ProofCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGroupInput = {
    id?: string
    name: string
    is1A: boolean
    profilePictureURL?: string | null
    groupInteId?: string | null
    points?: number
    isAdmin?: boolean
    groupBoard?: GroupClubUncheckedCreateNestedManyWithoutBoardInput
    proof?: ProofUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGroupInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGroupInput, UserUncheckedCreateWithoutGroupInput>
  }

  export type UserCreateWithoutGroupBoardInput = {
    id?: string
    name: string
    is1A: boolean
    profilePictureURL?: string | null
    points?: number
    isAdmin?: boolean
    group?: GroupClubCreateNestedManyWithoutUsersInput
    groupInte?: GroupInteCreateNestedOneWithoutUsersInteInput
    proof?: ProofCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGroupBoardInput = {
    id?: string
    name: string
    is1A: boolean
    profilePictureURL?: string | null
    groupInteId?: string | null
    points?: number
    isAdmin?: boolean
    group?: GroupClubUncheckedCreateNestedManyWithoutUsersInput
    proof?: ProofUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGroupBoardInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGroupBoardInput, UserUncheckedCreateWithoutGroupBoardInput>
  }

  export type ChallengeCreateWithoutGroupInput = {
    name: string
    description?: string | null
    userId: string
    userAcceptId?: string | null
    defiAccepte?: boolean
    type: $Enums.UploadType
    nbPoints?: number
    isDeleted?: boolean
    groupInteSucceed?: GroupInteCreateNestedManyWithoutChallengeSucceedInput
    location?: LocationCreateNestedOneWithoutChallengeInput
    proofs?: ProofCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeUncheckedCreateWithoutGroupInput = {
    challengeId?: number
    name: string
    description?: string | null
    userId: string
    userAcceptId?: string | null
    defiAccepte?: boolean
    type: $Enums.UploadType
    nbPoints?: number
    locationName?: string
    isDeleted?: boolean
    groupInteSucceed?: GroupInteUncheckedCreateNestedManyWithoutChallengeSucceedInput
    proofs?: ProofUncheckedCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeCreateOrConnectWithoutGroupInput = {
    where: ChallengeWhereUniqueInput
    create: XOR<ChallengeCreateWithoutGroupInput, ChallengeUncheckedCreateWithoutGroupInput>
  }

  export type ChallengeCreateManyGroupInputEnvelope = {
    data: ChallengeCreateManyGroupInput | ChallengeCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutGroupInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutGroupInput, UserUncheckedUpdateWithoutGroupInput>
    create: XOR<UserCreateWithoutGroupInput, UserUncheckedCreateWithoutGroupInput>
  }

  export type UserUpdateWithWhereUniqueWithoutGroupInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutGroupInput, UserUncheckedUpdateWithoutGroupInput>
  }

  export type UserUpdateManyWithWhereWithoutGroupInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutGroupInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    is1A?: BoolFilter<"User"> | boolean
    profilePictureURL?: StringNullableFilter<"User"> | string | null
    groupInteId?: StringNullableFilter<"User"> | string | null
    points?: IntFilter<"User"> | number
    isAdmin?: BoolFilter<"User"> | boolean
  }

  export type UserUpsertWithWhereUniqueWithoutGroupBoardInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutGroupBoardInput, UserUncheckedUpdateWithoutGroupBoardInput>
    create: XOR<UserCreateWithoutGroupBoardInput, UserUncheckedCreateWithoutGroupBoardInput>
  }

  export type UserUpdateWithWhereUniqueWithoutGroupBoardInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutGroupBoardInput, UserUncheckedUpdateWithoutGroupBoardInput>
  }

  export type UserUpdateManyWithWhereWithoutGroupBoardInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutGroupBoardInput>
  }

  export type ChallengeUpsertWithWhereUniqueWithoutGroupInput = {
    where: ChallengeWhereUniqueInput
    update: XOR<ChallengeUpdateWithoutGroupInput, ChallengeUncheckedUpdateWithoutGroupInput>
    create: XOR<ChallengeCreateWithoutGroupInput, ChallengeUncheckedCreateWithoutGroupInput>
  }

  export type ChallengeUpdateWithWhereUniqueWithoutGroupInput = {
    where: ChallengeWhereUniqueInput
    data: XOR<ChallengeUpdateWithoutGroupInput, ChallengeUncheckedUpdateWithoutGroupInput>
  }

  export type ChallengeUpdateManyWithWhereWithoutGroupInput = {
    where: ChallengeScalarWhereInput
    data: XOR<ChallengeUpdateManyMutationInput, ChallengeUncheckedUpdateManyWithoutGroupInput>
  }

  export type ChallengeScalarWhereInput = {
    AND?: ChallengeScalarWhereInput | ChallengeScalarWhereInput[]
    OR?: ChallengeScalarWhereInput[]
    NOT?: ChallengeScalarWhereInput | ChallengeScalarWhereInput[]
    challengeId?: IntFilter<"Challenge"> | number
    name?: StringFilter<"Challenge"> | string
    description?: StringNullableFilter<"Challenge"> | string | null
    groupId?: StringFilter<"Challenge"> | string
    userId?: StringFilter<"Challenge"> | string
    userAcceptId?: StringNullableFilter<"Challenge"> | string | null
    defiAccepte?: BoolFilter<"Challenge"> | boolean
    type?: EnumUploadTypeFilter<"Challenge"> | $Enums.UploadType
    nbPoints?: IntFilter<"Challenge"> | number
    locationName?: StringFilter<"Challenge"> | string
    isDeleted?: BoolFilter<"Challenge"> | boolean
  }

  export type UserCreateWithoutGroupInteInput = {
    id?: string
    name: string
    is1A: boolean
    profilePictureURL?: string | null
    points?: number
    isAdmin?: boolean
    group?: GroupClubCreateNestedManyWithoutUsersInput
    groupBoard?: GroupClubCreateNestedManyWithoutBoardInput
    proof?: ProofCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGroupInteInput = {
    id?: string
    name: string
    is1A: boolean
    profilePictureURL?: string | null
    points?: number
    isAdmin?: boolean
    group?: GroupClubUncheckedCreateNestedManyWithoutUsersInput
    groupBoard?: GroupClubUncheckedCreateNestedManyWithoutBoardInput
    proof?: ProofUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGroupInteInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGroupInteInput, UserUncheckedCreateWithoutGroupInteInput>
  }

  export type UserCreateManyGroupInteInputEnvelope = {
    data: UserCreateManyGroupInteInput | UserCreateManyGroupInteInput[]
    skipDuplicates?: boolean
  }

  export type ChallengeCreateWithoutGroupInteSucceedInput = {
    name: string
    description?: string | null
    userId: string
    userAcceptId?: string | null
    defiAccepte?: boolean
    type: $Enums.UploadType
    nbPoints?: number
    isDeleted?: boolean
    group: GroupClubCreateNestedOneWithoutChallengeInput
    location?: LocationCreateNestedOneWithoutChallengeInput
    proofs?: ProofCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeUncheckedCreateWithoutGroupInteSucceedInput = {
    challengeId?: number
    name: string
    description?: string | null
    groupId: string
    userId: string
    userAcceptId?: string | null
    defiAccepte?: boolean
    type: $Enums.UploadType
    nbPoints?: number
    locationName?: string
    isDeleted?: boolean
    proofs?: ProofUncheckedCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeCreateOrConnectWithoutGroupInteSucceedInput = {
    where: ChallengeWhereUniqueInput
    create: XOR<ChallengeCreateWithoutGroupInteSucceedInput, ChallengeUncheckedCreateWithoutGroupInteSucceedInput>
  }

  export type UserUpsertWithWhereUniqueWithoutGroupInteInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutGroupInteInput, UserUncheckedUpdateWithoutGroupInteInput>
    create: XOR<UserCreateWithoutGroupInteInput, UserUncheckedCreateWithoutGroupInteInput>
  }

  export type UserUpdateWithWhereUniqueWithoutGroupInteInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutGroupInteInput, UserUncheckedUpdateWithoutGroupInteInput>
  }

  export type UserUpdateManyWithWhereWithoutGroupInteInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutGroupInteInput>
  }

  export type ChallengeUpsertWithWhereUniqueWithoutGroupInteSucceedInput = {
    where: ChallengeWhereUniqueInput
    update: XOR<ChallengeUpdateWithoutGroupInteSucceedInput, ChallengeUncheckedUpdateWithoutGroupInteSucceedInput>
    create: XOR<ChallengeCreateWithoutGroupInteSucceedInput, ChallengeUncheckedCreateWithoutGroupInteSucceedInput>
  }

  export type ChallengeUpdateWithWhereUniqueWithoutGroupInteSucceedInput = {
    where: ChallengeWhereUniqueInput
    data: XOR<ChallengeUpdateWithoutGroupInteSucceedInput, ChallengeUncheckedUpdateWithoutGroupInteSucceedInput>
  }

  export type ChallengeUpdateManyWithWhereWithoutGroupInteSucceedInput = {
    where: ChallengeScalarWhereInput
    data: XOR<ChallengeUpdateManyMutationInput, ChallengeUncheckedUpdateManyWithoutGroupInteSucceedInput>
  }

  export type UserCreateWithoutProofInput = {
    id?: string
    name: string
    is1A: boolean
    profilePictureURL?: string | null
    points?: number
    isAdmin?: boolean
    group?: GroupClubCreateNestedManyWithoutUsersInput
    groupBoard?: GroupClubCreateNestedManyWithoutBoardInput
    groupInte?: GroupInteCreateNestedOneWithoutUsersInteInput
  }

  export type UserUncheckedCreateWithoutProofInput = {
    id?: string
    name: string
    is1A: boolean
    profilePictureURL?: string | null
    groupInteId?: string | null
    points?: number
    isAdmin?: boolean
    group?: GroupClubUncheckedCreateNestedManyWithoutUsersInput
    groupBoard?: GroupClubUncheckedCreateNestedManyWithoutBoardInput
  }

  export type UserCreateOrConnectWithoutProofInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProofInput, UserUncheckedCreateWithoutProofInput>
  }

  export type ChallengeCreateWithoutProofsInput = {
    name: string
    description?: string | null
    userId: string
    userAcceptId?: string | null
    defiAccepte?: boolean
    type: $Enums.UploadType
    nbPoints?: number
    isDeleted?: boolean
    group: GroupClubCreateNestedOneWithoutChallengeInput
    groupInteSucceed?: GroupInteCreateNestedManyWithoutChallengeSucceedInput
    location?: LocationCreateNestedOneWithoutChallengeInput
  }

  export type ChallengeUncheckedCreateWithoutProofsInput = {
    challengeId?: number
    name: string
    description?: string | null
    groupId: string
    userId: string
    userAcceptId?: string | null
    defiAccepte?: boolean
    type: $Enums.UploadType
    nbPoints?: number
    locationName?: string
    isDeleted?: boolean
    groupInteSucceed?: GroupInteUncheckedCreateNestedManyWithoutChallengeSucceedInput
  }

  export type ChallengeCreateOrConnectWithoutProofsInput = {
    where: ChallengeWhereUniqueInput
    create: XOR<ChallengeCreateWithoutProofsInput, ChallengeUncheckedCreateWithoutProofsInput>
  }

  export type UserUpsertWithoutProofInput = {
    update: XOR<UserUpdateWithoutProofInput, UserUncheckedUpdateWithoutProofInput>
    create: XOR<UserCreateWithoutProofInput, UserUncheckedCreateWithoutProofInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProofInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProofInput, UserUncheckedUpdateWithoutProofInput>
  }

  export type UserUpdateWithoutProofInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is1A?: BoolFieldUpdateOperationsInput | boolean
    profilePictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    group?: GroupClubUpdateManyWithoutUsersNestedInput
    groupBoard?: GroupClubUpdateManyWithoutBoardNestedInput
    groupInte?: GroupInteUpdateOneWithoutUsersInteNestedInput
  }

  export type UserUncheckedUpdateWithoutProofInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is1A?: BoolFieldUpdateOperationsInput | boolean
    profilePictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    groupInteId?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    group?: GroupClubUncheckedUpdateManyWithoutUsersNestedInput
    groupBoard?: GroupClubUncheckedUpdateManyWithoutBoardNestedInput
  }

  export type ChallengeUpsertWithoutProofsInput = {
    update: XOR<ChallengeUpdateWithoutProofsInput, ChallengeUncheckedUpdateWithoutProofsInput>
    create: XOR<ChallengeCreateWithoutProofsInput, ChallengeUncheckedCreateWithoutProofsInput>
    where?: ChallengeWhereInput
  }

  export type ChallengeUpdateToOneWithWhereWithoutProofsInput = {
    where?: ChallengeWhereInput
    data: XOR<ChallengeUpdateWithoutProofsInput, ChallengeUncheckedUpdateWithoutProofsInput>
  }

  export type ChallengeUpdateWithoutProofsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    userAcceptId?: NullableStringFieldUpdateOperationsInput | string | null
    defiAccepte?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    nbPoints?: IntFieldUpdateOperationsInput | number
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    group?: GroupClubUpdateOneRequiredWithoutChallengeNestedInput
    groupInteSucceed?: GroupInteUpdateManyWithoutChallengeSucceedNestedInput
    location?: LocationUpdateOneRequiredWithoutChallengeNestedInput
  }

  export type ChallengeUncheckedUpdateWithoutProofsInput = {
    challengeId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    groupId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userAcceptId?: NullableStringFieldUpdateOperationsInput | string | null
    defiAccepte?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    nbPoints?: IntFieldUpdateOperationsInput | number
    locationName?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    groupInteSucceed?: GroupInteUncheckedUpdateManyWithoutChallengeSucceedNestedInput
  }

  export type GroupClubCreateWithoutChallengeInput = {
    groupId: string
    name: string
    pictureURL?: string | null
    users?: UserCreateNestedManyWithoutGroupInput
    board?: UserCreateNestedManyWithoutGroupBoardInput
  }

  export type GroupClubUncheckedCreateWithoutChallengeInput = {
    groupId: string
    name: string
    pictureURL?: string | null
    users?: UserUncheckedCreateNestedManyWithoutGroupInput
    board?: UserUncheckedCreateNestedManyWithoutGroupBoardInput
  }

  export type GroupClubCreateOrConnectWithoutChallengeInput = {
    where: GroupClubWhereUniqueInput
    create: XOR<GroupClubCreateWithoutChallengeInput, GroupClubUncheckedCreateWithoutChallengeInput>
  }

  export type GroupInteCreateWithoutChallengeSucceedInput = {
    groupId: string
    name: string
    pictureURL?: string | null
    points?: number
    usersInte?: UserCreateNestedManyWithoutGroupInteInput
  }

  export type GroupInteUncheckedCreateWithoutChallengeSucceedInput = {
    groupId: string
    name: string
    pictureURL?: string | null
    points?: number
    usersInte?: UserUncheckedCreateNestedManyWithoutGroupInteInput
  }

  export type GroupInteCreateOrConnectWithoutChallengeSucceedInput = {
    where: GroupInteWhereUniqueInput
    create: XOR<GroupInteCreateWithoutChallengeSucceedInput, GroupInteUncheckedCreateWithoutChallengeSucceedInput>
  }

  export type LocationCreateWithoutChallengeInput = {
    name: string
  }

  export type LocationUncheckedCreateWithoutChallengeInput = {
    name: string
  }

  export type LocationCreateOrConnectWithoutChallengeInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutChallengeInput, LocationUncheckedCreateWithoutChallengeInput>
  }

  export type ProofCreateWithoutChallengeInput = {
    proofId?: string
    content: string
    type: $Enums.UploadType
    date: Date | string
    media?: string | null
    text?: string | null
    validatorId?: string | null
    status: $Enums.Status
    user: UserCreateNestedOneWithoutProofInput
  }

  export type ProofUncheckedCreateWithoutChallengeInput = {
    proofId?: string
    userId: string
    content: string
    type: $Enums.UploadType
    date: Date | string
    media?: string | null
    text?: string | null
    validatorId?: string | null
    status: $Enums.Status
  }

  export type ProofCreateOrConnectWithoutChallengeInput = {
    where: ProofWhereUniqueInput
    create: XOR<ProofCreateWithoutChallengeInput, ProofUncheckedCreateWithoutChallengeInput>
  }

  export type ProofCreateManyChallengeInputEnvelope = {
    data: ProofCreateManyChallengeInput | ProofCreateManyChallengeInput[]
    skipDuplicates?: boolean
  }

  export type GroupClubUpsertWithoutChallengeInput = {
    update: XOR<GroupClubUpdateWithoutChallengeInput, GroupClubUncheckedUpdateWithoutChallengeInput>
    create: XOR<GroupClubCreateWithoutChallengeInput, GroupClubUncheckedCreateWithoutChallengeInput>
    where?: GroupClubWhereInput
  }

  export type GroupClubUpdateToOneWithWhereWithoutChallengeInput = {
    where?: GroupClubWhereInput
    data: XOR<GroupClubUpdateWithoutChallengeInput, GroupClubUncheckedUpdateWithoutChallengeInput>
  }

  export type GroupClubUpdateWithoutChallengeInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUpdateManyWithoutGroupNestedInput
    board?: UserUpdateManyWithoutGroupBoardNestedInput
  }

  export type GroupClubUncheckedUpdateWithoutChallengeInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUncheckedUpdateManyWithoutGroupNestedInput
    board?: UserUncheckedUpdateManyWithoutGroupBoardNestedInput
  }

  export type GroupInteUpsertWithWhereUniqueWithoutChallengeSucceedInput = {
    where: GroupInteWhereUniqueInput
    update: XOR<GroupInteUpdateWithoutChallengeSucceedInput, GroupInteUncheckedUpdateWithoutChallengeSucceedInput>
    create: XOR<GroupInteCreateWithoutChallengeSucceedInput, GroupInteUncheckedCreateWithoutChallengeSucceedInput>
  }

  export type GroupInteUpdateWithWhereUniqueWithoutChallengeSucceedInput = {
    where: GroupInteWhereUniqueInput
    data: XOR<GroupInteUpdateWithoutChallengeSucceedInput, GroupInteUncheckedUpdateWithoutChallengeSucceedInput>
  }

  export type GroupInteUpdateManyWithWhereWithoutChallengeSucceedInput = {
    where: GroupInteScalarWhereInput
    data: XOR<GroupInteUpdateManyMutationInput, GroupInteUncheckedUpdateManyWithoutChallengeSucceedInput>
  }

  export type GroupInteScalarWhereInput = {
    AND?: GroupInteScalarWhereInput | GroupInteScalarWhereInput[]
    OR?: GroupInteScalarWhereInput[]
    NOT?: GroupInteScalarWhereInput | GroupInteScalarWhereInput[]
    groupId?: StringFilter<"GroupInte"> | string
    name?: StringFilter<"GroupInte"> | string
    pictureURL?: StringNullableFilter<"GroupInte"> | string | null
    points?: IntFilter<"GroupInte"> | number
  }

  export type LocationUpsertWithoutChallengeInput = {
    update: XOR<LocationUpdateWithoutChallengeInput, LocationUncheckedUpdateWithoutChallengeInput>
    create: XOR<LocationCreateWithoutChallengeInput, LocationUncheckedCreateWithoutChallengeInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutChallengeInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutChallengeInput, LocationUncheckedUpdateWithoutChallengeInput>
  }

  export type LocationUpdateWithoutChallengeInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type LocationUncheckedUpdateWithoutChallengeInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ProofUpsertWithWhereUniqueWithoutChallengeInput = {
    where: ProofWhereUniqueInput
    update: XOR<ProofUpdateWithoutChallengeInput, ProofUncheckedUpdateWithoutChallengeInput>
    create: XOR<ProofCreateWithoutChallengeInput, ProofUncheckedCreateWithoutChallengeInput>
  }

  export type ProofUpdateWithWhereUniqueWithoutChallengeInput = {
    where: ProofWhereUniqueInput
    data: XOR<ProofUpdateWithoutChallengeInput, ProofUncheckedUpdateWithoutChallengeInput>
  }

  export type ProofUpdateManyWithWhereWithoutChallengeInput = {
    where: ProofScalarWhereInput
    data: XOR<ProofUpdateManyMutationInput, ProofUncheckedUpdateManyWithoutChallengeInput>
  }

  export type ChallengeCreateWithoutLocationInput = {
    name: string
    description?: string | null
    userId: string
    userAcceptId?: string | null
    defiAccepte?: boolean
    type: $Enums.UploadType
    nbPoints?: number
    isDeleted?: boolean
    group: GroupClubCreateNestedOneWithoutChallengeInput
    groupInteSucceed?: GroupInteCreateNestedManyWithoutChallengeSucceedInput
    proofs?: ProofCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeUncheckedCreateWithoutLocationInput = {
    challengeId?: number
    name: string
    description?: string | null
    groupId: string
    userId: string
    userAcceptId?: string | null
    defiAccepte?: boolean
    type: $Enums.UploadType
    nbPoints?: number
    isDeleted?: boolean
    groupInteSucceed?: GroupInteUncheckedCreateNestedManyWithoutChallengeSucceedInput
    proofs?: ProofUncheckedCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeCreateOrConnectWithoutLocationInput = {
    where: ChallengeWhereUniqueInput
    create: XOR<ChallengeCreateWithoutLocationInput, ChallengeUncheckedCreateWithoutLocationInput>
  }

  export type ChallengeCreateManyLocationInputEnvelope = {
    data: ChallengeCreateManyLocationInput | ChallengeCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type ChallengeUpsertWithWhereUniqueWithoutLocationInput = {
    where: ChallengeWhereUniqueInput
    update: XOR<ChallengeUpdateWithoutLocationInput, ChallengeUncheckedUpdateWithoutLocationInput>
    create: XOR<ChallengeCreateWithoutLocationInput, ChallengeUncheckedCreateWithoutLocationInput>
  }

  export type ChallengeUpdateWithWhereUniqueWithoutLocationInput = {
    where: ChallengeWhereUniqueInput
    data: XOR<ChallengeUpdateWithoutLocationInput, ChallengeUncheckedUpdateWithoutLocationInput>
  }

  export type ChallengeUpdateManyWithWhereWithoutLocationInput = {
    where: ChallengeScalarWhereInput
    data: XOR<ChallengeUpdateManyMutationInput, ChallengeUncheckedUpdateManyWithoutLocationInput>
  }

  export type ProofCreateManyUserInput = {
    proofId?: string
    content: string
    type: $Enums.UploadType
    date: Date | string
    media?: string | null
    text?: string | null
    challengeId?: number | null
    validatorId?: string | null
    status: $Enums.Status
  }

  export type GroupClubUpdateWithoutUsersInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    board?: UserUpdateManyWithoutGroupBoardNestedInput
    challenge?: ChallengeUpdateManyWithoutGroupNestedInput
  }

  export type GroupClubUncheckedUpdateWithoutUsersInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    board?: UserUncheckedUpdateManyWithoutGroupBoardNestedInput
    challenge?: ChallengeUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupClubUncheckedUpdateManyWithoutUsersInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pictureURL?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GroupClubUpdateWithoutBoardInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUpdateManyWithoutGroupNestedInput
    challenge?: ChallengeUpdateManyWithoutGroupNestedInput
  }

  export type GroupClubUncheckedUpdateWithoutBoardInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUncheckedUpdateManyWithoutGroupNestedInput
    challenge?: ChallengeUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupClubUncheckedUpdateManyWithoutBoardInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pictureURL?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProofUpdateWithoutUserInput = {
    proofId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    validatorId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    challenge?: ChallengeUpdateOneWithoutProofsNestedInput
  }

  export type ProofUncheckedUpdateWithoutUserInput = {
    proofId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    challengeId?: NullableIntFieldUpdateOperationsInput | number | null
    validatorId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
  }

  export type ProofUncheckedUpdateManyWithoutUserInput = {
    proofId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    challengeId?: NullableIntFieldUpdateOperationsInput | number | null
    validatorId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
  }

  export type ChallengeCreateManyGroupInput = {
    challengeId?: number
    name: string
    description?: string | null
    userId: string
    userAcceptId?: string | null
    defiAccepte?: boolean
    type: $Enums.UploadType
    nbPoints?: number
    locationName?: string
    isDeleted?: boolean
  }

  export type UserUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is1A?: BoolFieldUpdateOperationsInput | boolean
    profilePictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    groupBoard?: GroupClubUpdateManyWithoutBoardNestedInput
    groupInte?: GroupInteUpdateOneWithoutUsersInteNestedInput
    proof?: ProofUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is1A?: BoolFieldUpdateOperationsInput | boolean
    profilePictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    groupInteId?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    groupBoard?: GroupClubUncheckedUpdateManyWithoutBoardNestedInput
    proof?: ProofUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is1A?: BoolFieldUpdateOperationsInput | boolean
    profilePictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    groupInteId?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUpdateWithoutGroupBoardInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is1A?: BoolFieldUpdateOperationsInput | boolean
    profilePictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    group?: GroupClubUpdateManyWithoutUsersNestedInput
    groupInte?: GroupInteUpdateOneWithoutUsersInteNestedInput
    proof?: ProofUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGroupBoardInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is1A?: BoolFieldUpdateOperationsInput | boolean
    profilePictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    groupInteId?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    group?: GroupClubUncheckedUpdateManyWithoutUsersNestedInput
    proof?: ProofUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutGroupBoardInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is1A?: BoolFieldUpdateOperationsInput | boolean
    profilePictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    groupInteId?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ChallengeUpdateWithoutGroupInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    userAcceptId?: NullableStringFieldUpdateOperationsInput | string | null
    defiAccepte?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    nbPoints?: IntFieldUpdateOperationsInput | number
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    groupInteSucceed?: GroupInteUpdateManyWithoutChallengeSucceedNestedInput
    location?: LocationUpdateOneRequiredWithoutChallengeNestedInput
    proofs?: ProofUpdateManyWithoutChallengeNestedInput
  }

  export type ChallengeUncheckedUpdateWithoutGroupInput = {
    challengeId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    userAcceptId?: NullableStringFieldUpdateOperationsInput | string | null
    defiAccepte?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    nbPoints?: IntFieldUpdateOperationsInput | number
    locationName?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    groupInteSucceed?: GroupInteUncheckedUpdateManyWithoutChallengeSucceedNestedInput
    proofs?: ProofUncheckedUpdateManyWithoutChallengeNestedInput
  }

  export type ChallengeUncheckedUpdateManyWithoutGroupInput = {
    challengeId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    userAcceptId?: NullableStringFieldUpdateOperationsInput | string | null
    defiAccepte?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    nbPoints?: IntFieldUpdateOperationsInput | number
    locationName?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserCreateManyGroupInteInput = {
    id?: string
    name: string
    is1A: boolean
    profilePictureURL?: string | null
    points?: number
    isAdmin?: boolean
  }

  export type UserUpdateWithoutGroupInteInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is1A?: BoolFieldUpdateOperationsInput | boolean
    profilePictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    group?: GroupClubUpdateManyWithoutUsersNestedInput
    groupBoard?: GroupClubUpdateManyWithoutBoardNestedInput
    proof?: ProofUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGroupInteInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is1A?: BoolFieldUpdateOperationsInput | boolean
    profilePictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    group?: GroupClubUncheckedUpdateManyWithoutUsersNestedInput
    groupBoard?: GroupClubUncheckedUpdateManyWithoutBoardNestedInput
    proof?: ProofUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutGroupInteInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is1A?: BoolFieldUpdateOperationsInput | boolean
    profilePictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ChallengeUpdateWithoutGroupInteSucceedInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    userAcceptId?: NullableStringFieldUpdateOperationsInput | string | null
    defiAccepte?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    nbPoints?: IntFieldUpdateOperationsInput | number
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    group?: GroupClubUpdateOneRequiredWithoutChallengeNestedInput
    location?: LocationUpdateOneRequiredWithoutChallengeNestedInput
    proofs?: ProofUpdateManyWithoutChallengeNestedInput
  }

  export type ChallengeUncheckedUpdateWithoutGroupInteSucceedInput = {
    challengeId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    groupId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userAcceptId?: NullableStringFieldUpdateOperationsInput | string | null
    defiAccepte?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    nbPoints?: IntFieldUpdateOperationsInput | number
    locationName?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    proofs?: ProofUncheckedUpdateManyWithoutChallengeNestedInput
  }

  export type ChallengeUncheckedUpdateManyWithoutGroupInteSucceedInput = {
    challengeId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    groupId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userAcceptId?: NullableStringFieldUpdateOperationsInput | string | null
    defiAccepte?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    nbPoints?: IntFieldUpdateOperationsInput | number
    locationName?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProofCreateManyChallengeInput = {
    proofId?: string
    userId: string
    content: string
    type: $Enums.UploadType
    date: Date | string
    media?: string | null
    text?: string | null
    validatorId?: string | null
    status: $Enums.Status
  }

  export type GroupInteUpdateWithoutChallengeSucceedInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    usersInte?: UserUpdateManyWithoutGroupInteNestedInput
  }

  export type GroupInteUncheckedUpdateWithoutChallengeSucceedInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    usersInte?: UserUncheckedUpdateManyWithoutGroupInteNestedInput
  }

  export type GroupInteUncheckedUpdateManyWithoutChallengeSucceedInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    pictureURL?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
  }

  export type ProofUpdateWithoutChallengeInput = {
    proofId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    validatorId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    user?: UserUpdateOneRequiredWithoutProofNestedInput
  }

  export type ProofUncheckedUpdateWithoutChallengeInput = {
    proofId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    validatorId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
  }

  export type ProofUncheckedUpdateManyWithoutChallengeInput = {
    proofId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    validatorId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
  }

  export type ChallengeCreateManyLocationInput = {
    challengeId?: number
    name: string
    description?: string | null
    groupId: string
    userId: string
    userAcceptId?: string | null
    defiAccepte?: boolean
    type: $Enums.UploadType
    nbPoints?: number
    isDeleted?: boolean
  }

  export type ChallengeUpdateWithoutLocationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    userAcceptId?: NullableStringFieldUpdateOperationsInput | string | null
    defiAccepte?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    nbPoints?: IntFieldUpdateOperationsInput | number
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    group?: GroupClubUpdateOneRequiredWithoutChallengeNestedInput
    groupInteSucceed?: GroupInteUpdateManyWithoutChallengeSucceedNestedInput
    proofs?: ProofUpdateManyWithoutChallengeNestedInput
  }

  export type ChallengeUncheckedUpdateWithoutLocationInput = {
    challengeId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    groupId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userAcceptId?: NullableStringFieldUpdateOperationsInput | string | null
    defiAccepte?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    nbPoints?: IntFieldUpdateOperationsInput | number
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    groupInteSucceed?: GroupInteUncheckedUpdateManyWithoutChallengeSucceedNestedInput
    proofs?: ProofUncheckedUpdateManyWithoutChallengeNestedInput
  }

  export type ChallengeUncheckedUpdateManyWithoutLocationInput = {
    challengeId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    groupId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userAcceptId?: NullableStringFieldUpdateOperationsInput | string | null
    defiAccepte?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumUploadTypeFieldUpdateOperationsInput | $Enums.UploadType
    nbPoints?: IntFieldUpdateOperationsInput | number
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}