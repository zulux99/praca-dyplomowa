import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function HomePage() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div>Witoj przybyszu na stronie głównej</div>
      {user && <p>Hello {user.username}</p>}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac posuere erat.
        Suspendisse potenti. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
        ridiculus mus. Donec sit amet dui semper, tincidunt tellus eu, finibus quam. Donec vitae
        porttitor metus. Donec a libero et ligula venenatis porta. Curabitur accumsan nibh orci, in
        venenatis erat molestie at. Maecenas felis est, congue mollis commodo vitae, vestibulum
        vitae magna. Nunc molestie ex faucibus pulvinar condimentum. Phasellus lobortis, lorem ut
        vehicula molestie, lectus nibh accumsan dolor, et pharetra urna leo a mi. In fermentum nulla
        a ex eleifend, quis tincidunt lacus tempor. Ut sed nibh porttitor, tincidunt urna tristique,
        consectetur libero. Nam lorem neque, vestibulum eget porttitor vitae, efficitur eget elit.
        Donec eget congue erat. Nam ac enim leo. Morbi ullamcorper, nisi at pharetra facilisis,
        lacus magna efficitur dui, vel congue est diam vel nisl. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia curae; Nullam eu accumsan sapien, nec
        venenatis nulla. Integer pulvinar enim ipsum, vitae volutpat nunc condimentum sed. Mauris
        gravida, est eget bibendum varius, enim nulla mollis nibh, vel convallis lorem sem vitae ex.
        Aenean quis ipsum a dui rhoncus vestibulum. Vivamus mollis euismod maximus. Sed nec nulla
        eget libero lacinia tempus et in mauris. Curabitur pharetra lobortis nisi consectetur
        dictum. Aliquam et nulla sit amet nibh posuere vulputate at in sem. Quisque id eleifend
        erat. Nullam eu tellus a mi porttitor mattis eu euismod risus. Mauris vel suscipit augue.
        Vivamus venenatis, purus vitae varius interdum, quam dolor imperdiet turpis, vel rutrum
        justo sapien eget mauris. Curabitur non quam eu odio interdum tempor at vel risus. Duis eget
        urna tortor. Aliquam consequat pretium ex, eu lobortis mi. Sed vestibulum tempus metus, in
        aliquam sem aliquet ac. Vivamus vel ligula augue. Vivamus ac velit eget neque tristique
        rhoncus sit amet in quam. Praesent quis bibendum leo. Fusce malesuada turpis sapien, ut
        dapibus tortor feugiat non. Suspendisse convallis nisi ac velit ullamcorper vestibulum.
        Quisque nec sem id purus suscipit pulvinar. Nullam leo justo, aliquet quis elit id,
        vestibulum luctus ipsum. Maecenas blandit felis nec turpis sodales scelerisque. Vivamus
        ultrices hendrerit dignissim. Etiam imperdiet massa non lacinia scelerisque. Pellentesque eu
        orci quis nunc lacinia venenatis vel et nunc. Nunc eu ante feugiat, ornare odio eu, varius
        augue. Morbi hendrerit felis vitae tortor dapibus aliquam. Curabitur lorem augue, commodo
        eget mattis sit amet, cursus scelerisque ligula. Suspendisse fermentum pulvinar sapien vel
        condimentum. Sed vel condimentum diam. Aliquam ut interdum ex. Duis sodales ac lorem ut
        hendrerit. Donec eu ante sed massa auctor hendrerit. Mauris sed blandit purus. Praesent
        imperdiet mi ornare tellus semper facilisis. Praesent fermentum tristique tellus dictum
        volutpat. Ut tincidunt consequat tellus, ac luctus nibh. Etiam scelerisque erat id elit
        volutpat, eu accumsan eros porttitor. Phasellus vulputate viverra enim ut egestas. Aenean et
        gravida sapien, ac volutpat quam. Aliquam semper lacus lacus, at commodo sapien sodales a.
        Vivamus tristique est id sodales luctus. Suspendisse malesuada mauris rutrum mi bibendum
        molestie. Fusce mattis, lacus vel egestas convallis, ligula massa pretium massa, gravida
        tempor leo risus ut tortor. Nulla a porttitor quam. Praesent ac dui in sapien facilisis
        elementum. Cras nisl orci, placerat in orci eget, vulputate imperdiet mi. Etiam vel ornare
        dui. Mauris ut ultricies libero. Vestibulum sit amet odio eu leo consectetur molestie vel
        nec metus. Praesent non urna ac turpis pharetra vehicula. Ut non ante in erat tincidunt
        pretium. Duis et bibendum libero. Duis egestas tristique enim. Quisque venenatis eget lectus
        in ullamcorper. Nullam accumsan, enim eget fringilla congue, metus elit laoreet mauris, eget
        consectetur lectus ipsum at justo. In finibus magna non odio egestas sagittis. Vestibulum
        sit amet purus in sapien blandit dignissim. Quisque id pellentesque elit. Cras suscipit id
        sapien vitae porta. Nulla tempor dui ut orci consectetur accumsan in eu leo. Phasellus
        iaculis ullamcorper neque a vehicula. Quisque id turpis nisl. Integer quis nulla molestie,
        dignissim ligula eget, facilisis risus. Morbi blandit varius mattis. Nullam id porta quam,
        vel iaculis sapien. Etiam mattis neque nec molestie fermentum. Cras sapien eros, dignissim
        ac vulputate eu, congue at ipsum. Proin eu feugiat neque. Praesent aliquet fringilla odio
        egestas pretium. Curabitur bibendum pellentesque turpis. Sed leo odio, fringilla a massa
        nec, laoreet malesuada nunc. Integer a mi at diam fringilla maximus nec at quam. Vivamus
        pharetra augue massa, quis ultricies turpis euismod a. Proin eget ullamcorper ligula, eget
        volutpat ligula. Sed aliquet auctor purus, vitae sagittis urna euismod at. Integer lobortis
        ex risus, at commodo ligula dignissim eget. Fusce fermentum tempus vehicula. Aenean
        consectetur justo id diam suscipit semper. Vestibulum at suscipit orci. Morbi id turpis vel
        dolor iaculis vehicula. Aliquam erat volutpat. Ut eget imperdiet turpis. Phasellus sed
        efficitur ligula.
      </p>
    </>
  );
}

export default HomePage;
