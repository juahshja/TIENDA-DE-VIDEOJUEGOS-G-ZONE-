import Notificacion from './Notificacion';

const ContenedorNotificaciones = ({ notificaciones, eliminarNotificacion }) => {
  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050, width: '300px' }}>
      {notificaciones.map(notificacion => (
        <Notificacion
          key={notificacion.id}
          mensaje={notificacion.mensaje}
          visible={true}
          onClose={() => eliminarNotificacion(notificacion.id)}
        />
      ))}
    </div>
  );
};

export default ContenedorNotificaciones;