import ImagesFlow from '@/ui/components/scroll/ImagesFlow';

const images = [
  'https://i.pinimg.com/1200x/6d/c1/51/6dc151fccad84848851615bf7fd5273e.jpg',
  'https://i.pinimg.com/736x/86/5b/37/865b37c273ce08ccba905cfd5c43f7fd.jpg',
  'https://i.pinimg.com/1200x/8d/ff/a1/8dffa167d7c06c98303cf74e1e684c0c.jpg',
  'https://i.pinimg.com/1200x/7a/9d/b3/7a9db3f4a8c14244c9799897c5b27e15.jpg',
  'https://i.pinimg.com/1200x/92/6a/f6/926af63e63524d0b2b5d4d29f8c2960f.jpg',
  'https://i.pinimg.com/736x/3c/fd/40/3cfd40d9da71424ccfdb4a4f23d24b15.jpg',
  'https://i.pinimg.com/736x/b3/a9/ea/b3a9eacf0a48d73daf7a9d99a641358d.jpg',
  'https://i.pinimg.com/1200x/ea/7d/64/ea7d6422e60fd7d08a2f57e7a81f8db5.jpg',
  'https://i.pinimg.com/1200x/df/e4/3e/dfe43e45689d1c604a3bdadc10ff6400.jpg',
  'https://i.pinimg.com/1200x/83/a0/61/83a0611b7dffe9a845b371161da4a6ca.jpg',
  'https://i.pinimg.com/736x/3b/30/71/3b30719fcf57e0fb4e4c7875c123be89.jpg',
  'https://i.pinimg.com/1200x/e6/9e/b6/e69eb622ea968f2d107bc5bce20aab71.jpg',
  'https://i.pinimg.com/1200x/b8/f8/a0/b8f8a07bb42de63c8a03c136457535d4.jpg',
  'https://i.pinimg.com/1200x/ce/8d/c9/ce8dc976c68aae6e5b6bf13f0b563de7.jpg',
  'https://i.pinimg.com/736x/bb/02/06/bb0206c39dbae6728fe93e97ea7caff1.jpg',
  'https://i.pinimg.com/736x/8d/70/95/8d7095181d12fd4452273eb2677a2ff4.jpg',
  'https://i.pinimg.com/736x/e4/3c/3c/e43c3c3f9bb348d26be1abd4eefbe2b7.jpg',
  'https://i.pinimg.com/736x/96/e1/ea/96e1eac3c1ccb9c7817cfd83e5d3c113.jpg',
  'https://i.pinimg.com/1200x/60/7c/14/607c144c8ed65de6179e9dcb43d0a949.jpg',
  'https://i.pinimg.com/736x/cf/a9/46/cfa94611e77bece6cb69df26f7d27c5c.jpg',
  'https://i.pinimg.com/736x/04/89/04/048904227df6ca36de30a4d0b874eaa4.jpg',
  'https://i.pinimg.com/1200x/77/ed/6f/77ed6fa44994de79cf59d92881cad332.jpg',
  'https://i.pinimg.com/1200x/b5/83/42/b583427440c3b45fb0624961bfc8ea66.jpg',
  'https://i.pinimg.com/1200x/dc/ee/8b/dcee8b92e1f9f766abe289dec5c54d85.jpg',
  'https://i.pinimg.com/736x/42/61/90/42619054f77a6e8cbbe20181b93027fd.jpg',
  'https://i.pinimg.com/736x/b6/ce/95/b6ce9557d1937922cdcc84d4abcb8143.jpg',
  'https://i.pinimg.com/1200x/a2/00/3f/a2003f95fde2cf6615a484ce3e43b33f.jpg',
  'https://i.pinimg.com/1200x/38/26/e4/3826e4c2a4cad3165d852d2ccbf078ed.jpg',
];

const ImagesFlowDemo = () => (
  <ImagesFlow
    introTitle="Begin"
    introSubtitle="Scroll to explore the journey"
    flowText={'Every moment holds a universe\nwaiting to be discovered'}
    outroTitle="BYE!"
    outroSubtitle="The end is just another beginning"
    images={images}
  />
);

export { ImagesFlowDemo };
