<script setup lang="ts">
// const { bootstrap, getSignatures } = $(litStore());

// onMounted(bootstrap);

// onMounted(async () => {
//   await getSignatures();
// });
const posts = [
  {
    id: 1,
    title: "Boost your conversion rate 1",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "Boost your conversion rate 2",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 3,
    title: "Boost your conversion rate 3",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  // More posts...
];
</script>

<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:max-w-4xl">
        <h2 class="font-bold tracking-tight text-3xl text-gray-900 sm:text-4xl">From the blog</h2>
        <p class="mt-2 text-lg text-gray-600 leading-8">Only the Token holder can Read the full blog content.</p>
        <div class="space-y-20 mt-16 lg:space-y-20 lg:mt-20">
          <article v-for="post in posts" :key="post.id" class="flex flex-col gap-8 relative isolate lg:flex-row">
            <div class="relative aspect-[16/9] sm:aspect-[2/1] lg:w-64 lg:aspect-square lg:shrink-0">
              <img :src="post.imageUrl" alt="" class="h-full object-cover bg-gray-50 rounded-2xl w-full inset-0 absolute" />
              <div class="rounded-2xl ring-inset inset-0 ring-1 ring-gray-900/10 absolute" />
            </div>
            <div>
              <div class="flex text-xs gap-x-4 items-center">
                <time :datetime="post.datetime" class="text-gray-500">{{ post.date }}</time>
                <a :href="post.category.href" class="rounded-full font-medium bg-gray-50 py-1.5 px-3 text-gray-600 z-10 relative hover:bg-gray-100">{{
                  post.category.title
                }}</a>
              </div>
              <div class="max-w-xl group relative">
                <h3 class="font-semibold mt-3 text-lg text-gray-900 leading-6 group-hover:text-gray-600">
                  <a :href="post.href">
                    <span class="inset-0 absolute" />
                    {{ post.title }}
                  </a>
                </h3>
                <p class="mt-5 text-sm text-gray-600 leading-6">{{ post.description }}</p>
              </div>
              <div class="border-t flex border-gray-900/5 mt-6 pt-6">
                <div class="flex gap-x-4 relative items-center">
                  <img :src="post.author.imageUrl" alt="" class="rounded-full bg-gray-50 h-10 w-10" />
                  <div class="text-sm leading-6">
                    <p class="font-semibold text-gray-900">
                      <a :href="post.author.href">
                        <span class="inset-0 absolute" />
                        {{ post.author.name }}
                      </a>
                    </p>
                    <p class="text-gray-600">{{ post.author.role }}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>
